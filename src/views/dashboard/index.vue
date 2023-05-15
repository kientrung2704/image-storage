<template>
  <div class="main">
    <div class="breadcrumb-header">
      <AppBreadcrumb />
      <div class="breadcrumb-right">
        <a-button>1</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadcrumb from '../../components/AppBreadcrumb.vue'

export default {
  data() {
    return {}
  },
  computed: {},
  created() {
    this.$root.$refs.loading.start()
    setInterval(() => {
      this.$root.$refs.loading.finish()
    }, 500)
  },
  methods: {},
  components: { AppBreadcrumb }
}
</script>

<style lang="scss" scoped>
.main {
  .breadcrumb-header {
    padding: 12px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
