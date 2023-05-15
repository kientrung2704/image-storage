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
        <div class="image-container">
          <img v-for="(image, i) in months" :key="i" class="image" :src="image.src" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadcrumb from '../../components/AppBreadcrumb.vue'

export default {
  components: { AppBreadcrumb },
  data() {
    return {
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.main {
  .content {
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
