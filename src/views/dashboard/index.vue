<template>
  <div class="main">
    <AppBreadcrumb>
      <template #content>
        <div>1111</div>
      </template>
    </AppBreadcrumb>
    <div class="content">
      <div v-for="(months, index) in images" :key="index">
        {{ index }}
        <div class="content-image">
          <div class="image" v-for="(image, i) in months" :key="i" @click="clickPhoto(image.id)">
            <img class="img-responsive" :src="image.src" alt="image" />
          </div>
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
      />
    </a-modal>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { nextTick } from 'vue'
// import AppBreadcrumb from '../../components/AppBreadcrumb.vue'
// import AppImageGallery from '../../components/AppBreadcrumb.vue'
export default {
  components: {
    // AppBreadcrumb,
    // AppImageGallery
  },
  data() {
    return {
      visible: false,
      imageViewerDirection: 0,
      images: {
        '05/2023': [
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 2,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
          },
          {
            id: 3,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 4,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
          }
        ],
        '04/2023': [
          {
            id: 5,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 6,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
          }
        ],
        '03/2023': [
          {
            id: 7,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 8,
            src: new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
          }
        ]
      },
      imagesList: [],
      currentPhoto: null,
      prevPhoto: null,
      nextPhoto: null
    }
  },
  computed: {},
  created() {
    this.$root.$refs.loading.start()
    for (const property in this.images) {
      // console.log(this.images[property])
      this.images[property].forEach((element) => {
        this.imagesList.push(element)
      })
    }
    this.totalPhoto = this.imagesList.length
    setInterval(() => {
      this.$root.$refs.loading.finish()
    }, 500)
  },
  methods: {
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
        console.log('IMAGE LIST ', this.imagesList)
        console.log('CURRENT ', this.currentPhoto)
        console.log('NEXT ', this.nextPhoto)
        console.log('PREV ', this.prevPhoto)
      } else {
        message.error('Error')
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
      console.log(this.imageViewerDirection)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .content {
    &-image {
      display: flex;
    }
    .content-image {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      .image {
        height: 220px;

        .img-responsive {
          height: 220px;
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
</style>
