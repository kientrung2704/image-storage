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
          <div class="image" v-for="(image, i) in months" :key="i" @click="visible = true">
            <img width="200" class="img-responsive" :src="image.src" alt="image" />
          </div>
        </div>
      </div>
    </div>
    <a-modal
      v-model:visible="visible"
      title=""
      width="100%"
      :closable="false"
      wrap-class-name="full-modal"
      @ok="handleOk"
      :footer="null"
    >
      <AppImageGallery ref="viewer" @left="navigate(-1)" @right="navigate(1)" />
    </a-modal>
  </div>
</template>

<script>
// import AppBreadcrumb from '../../components/AppBreadcrumb.vue'
// import AppImageGallery from '../../components/AppBreadcrumb.vue'
export default {
  components: {
    // AppBreadcrumb,
    // AppImageGallery
  },
  data() {
    return {
      // plugins: [lgZoom, lgThumbnail],
      infoPaneSize: 400,
      showPhotoButtons: true,
      showInfo: false,
      visible: false,
      isSelecting: true,
      selected: false,
      viewers: [
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.png`, import.meta.url).href,
        new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
      ],
      images: {
        '05/2023': [
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          }
        ],
        '04/2023': [
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          }
        ],
        '03/2023': [
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          },
          {
            id: 1,
            src: new URL(`/src/assets/images/${1}.png`, import.meta.url).href
          }
        ]
      }
    }
  },
  computed: {},
  created() {
    this.$root.$refs.loading.start()
    setInterval(() => {
      this.$root.$refs.loading.finish()
    }, 500)
  },
  methods: {
    onInit() {
      console.log('lightGallery has been initialized')
    },
    onBeforeSlide(e) {
      console.log('calling before slide', e)
    },
    addToSelection() {
      console.log('addToSelection')
    },
    removeFromSelection() {
      console.log('addToSelection')
    },
    navigate(index) {
      console.log('NAVIGATE' + index)
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
    .image-container {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      .image {
        height: 220px;
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
