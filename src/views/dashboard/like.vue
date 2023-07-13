<template>
  <div class="main">
    <div class="empty" v-if="isEmpty(imagesList)">
      <img src="@/assets/images/empty_favorites.svg" />
      <p class="mt-18 title">Không có ảnh yêu thích nào</p>
      <p>Ảnh và video bạn đánh dấu là yêu thích sẽ hiển thị ở đây</p>
    </div>
    <div class="wrapper-content" v-else>
      <!-- <div v-for="(months, index) in images" :key="index" class="content"> -->
      <div class="content">
        <div class="content-image">
          <div
            class="image"
            v-for="(image, i) in imagesList"
            :key="i"
            @click="clickPhoto(image.id)"
          >
            <img class="img-responsive" :src="getImageUrl(image.filename)" alt="image" />
          </div>
        </div>
      </div>
      <!-- </div> -->
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
      />
    </a-modal>
  </div>
</template>

<script>
import { isEmpty } from '@/utils/common/is'
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'

export default {
  data() {
    return {
      visible: false,
      imageViewerDirection: 0,
      images: {},
      imagesList: [],
      currentPhoto: null,
      prevPhoto: null,
      nextPhoto: null,
      files: []
    }
  },

  async created() {
    await this.getList()
    // await this.formatListImage()
  },

  methods: {
    isEmpty,
    getImageUrl(file) {
      return 'http://localhost:8080/api/images/' + file
    },
    async getList() {
      this.$root.$refs.loading.start()
      this.images = {}
      const res = await this.$store.dispatch('photo/likeList')
      this.imagesList = res
      this.$root.$refs.loading.finish()
    },
    formatListImage() {
      this.imagesList = []
      for (const property in this.images) {
        this.images[property].forEach((element) => {
          this.imagesList.push(element)
        })
      }
      this.totalPhoto = this.imagesList.length
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
      } else {
        this.visible = false
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
      this.$refs.viewer.handleDescription()
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
    async deleteFile(id) {
      // TO DO
      // await this.getList()
      // await this.formatListImage()
    },
    async likeFile(file) {
      this.$root.$refs.loading.start()
      let res = null
      if (file.like) {
        res = await this.$store.dispatch('photo/dislike', file.id)
      } else {
        res = await this.$store.dispatch('photo/like', file.id)
      }
      if (res.error) {
        this.$notification[TYPE_ERROR]({
          message: this.$i18n.t('message.estate.createError'),
          description: this.$i18n.t('message.estate.createError')
        })
      } else {
        await this.getList()
        await this.formatListImage()
        await this.clickPhoto(file.id)
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
  .wrapper-content {
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
</style>
