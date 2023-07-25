<template>
  <div class="main">
    <div class="empty" v-if="isEmpty(imagesList)">
      <img src="@/assets/images/empty_trash.svg" />
      <p class="mt-18 title">Không có thư mục nào</p>
      <p>Chỉ các mục đã xóa khỏi Photo sẽ hiển thị ở đây. Những mục này sẽ bị xóa sau 60 ngày.</p>
    </div>
    <div class="content" v-else>
      <div class="content-image">
        <div class="image" v-for="(image, i) in imagesList" :key="i" @click="clickPhoto(image.id)">
          <img class="img-responsive" :src="image.src" alt="image" />
        </div>
      </div>
    </div>
    <a-modal
      title=""
      width="100%"
      :footer="null"
      :closable="false"
      v-model:visible="visible"
      wrap-class-name="full-modal"
      @keydown="keyboardActionDialog($event)"
    >
      <AppImageGallery
        ref="viewer"
        @left="navigate(-1)"
        @right="navigate(1)"
        :nextPhoto="nextPhoto"
        :prevPhoto="prevPhoto"
        :current-photo="currentPhoto"
        :direction="imageViewerDirection"
        :total-photo="totalPhoto"
        @close="close()"
        @detele-file="deleteFile"
        @like-file="likeFile"
        @remove-file="removeFile"
      />
    </a-modal>
  </div>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import { isEmpty } from '@/utils/common/is'

export default {
  data() {
    return {
      visible: false,
      imageViewerDirection: 0,
      images: {},
      imagesList: [],
      currentPhoto: null,
      prevPhoto: null,
      nextPhoto: null
    }
  },
  computed: {},

  async created() {
    await this.getList()
  },
  methods: {
    isEmpty,
    async getList() {
      this.$root.$refs.loading.start()
      this.images = {}
      const res = await this.$store.dispatch('photo/listTrash')
      this.imagesList = res
      this.$root.$refs.loading.finish()
    },
    clickPhoto(id) {
      const index = this.imagesList.findIndex((e) => e.id === id)
      if (index >= 0) {
        this.visible = true
        this.imageViewerDirection = 0
        this.currentPhoto = {
          index: index,
          photo: this.imagesList[index]
        }
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      }
    },
    getNextSectionSegmentAsset(currentAsset, dir) {
      const assetLength = this.totalPhoto
      let nextIndex = currentAsset.index + dir
      let nextPhoto = this.imagesList[nextIndex]
      if (nextIndex < 0) {
        nextIndex = 0
        nextPhoto = currentAsset.photo
      }
      if (nextIndex > assetLength - 1) {
        nextIndex = currentAsset.index
        nextPhoto = currentAsset.photo
      }
      return {
        index: nextIndex,
        photo: nextPhoto
      }
    },
    navigate(dir) {
      this.imageViewerDirection = dir
      if (dir === 1) {
        this.prevPhoto = this.currentPhoto
        this.currentPhoto = this.nextPhoto
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      } else {
        this.nextPhoto = this.currentPhoto
        this.currentPhoto = this.prevPhoto
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
      }
      // this.$refs.viewer.handleDescription()
    },
    keyboardActionDialog(event) {
      if (event.code == 'ArrowLeft') {
        if (this.currentPhoto.index === 0) return
        this.navigate(-1)
      } else if (event.code == 'ArrowRight') {
        this.navigate(1)
      } else if (event.code == 'Escape') {
        this.clearNav()
      }
    },
    clearNav() {
      this.currentPhoto = null
      this.prevPhoto = null
      this.nextPhoto = null
    },
    close() {
      this.visible = false
      this.$nextTick(() => {
        this.clearNav()
      })
    },
    async removeFile(id, type) {
      this.$root.$refs.loading.start()
      let nextIndex
      if (type === 'undo') {
        await this.$store.dispatch('photo/undo', id)
      } else {
        await this.$store.dispatch('photo/remove', id)
        await this.$store.dispatch('user/getUserInfo')
      }

      const assetLength = this.totalPhoto
      const index = this.imagesList.findIndex((e) => e.id === id)
      this.imagesList.splice(index, 1)
      if (this.imagesList.length > 0) {
        if (index === assetLength - 1) {
          nextIndex = index - 1
          this.imageViewerDirection = -1
          this.currentPhoto = {
            index: nextIndex,
            photo: this.imagesList[nextIndex]
          }
          this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
        } else if (index === 0) {
          nextIndex = index
          this.imageViewerDirection = 1
          this.currentPhoto = {
            index: nextIndex,
            photo: this.imagesList[nextIndex]
          }
          this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
        } else {
          nextIndex = index
          this.imageViewerDirection = 1
          this.currentPhoto = {
            index: nextIndex,
            photo: this.imagesList[nextIndex]
          }
          this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
          this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
        }
      } else {
        this.close()
      }

      this.$root.$refs.loading.finish()
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 24px;
      font-weight: 600;
    }
  }
  .content {
    padding-bottom: 24px;

    &-image {
      display: flex;
    }
    .content-image {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      .image {
        height: 180px;

        .img-responsive {
          height: 180px;
          width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.ant-modal-wrap {
  overflow: hidden !important;
}
.full-modal {
  .ant-modal {
    padding: 0 !important;
    max-width: 100%;
    top: 0;
    // padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    // height: calc(100vh);
    background-color: #000;
  }
  .ant-modal-body {
    padding: 0;
    flex: 1;
  }
}

.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all 0.2s;
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}

.example-full label.dropdown-item {
  margin-bottom: 0;
}

.example-full .btn-group .dropdown-toggle {
  margin-right: 0.6rem;
}

.td-image-thumb {
  max-width: 4em;
  max-height: 4em;
}

.example-full .filename {
  margin-bottom: 0.3rem;
}

.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-foorer {
  padding: 0.5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.example-full .edit-image img {
  max-width: 100%;
}

.example-full .edit-image-tool {
  margin-top: 0.6rem;
}

.example-full .edit-image-tool .btn-group {
  margin-right: 0.6rem;
}

.example-full .footer-status {
  padding-top: 0.4rem;
}

.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}

.drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
