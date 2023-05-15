<template>
  <div class="breadcrumb">
    <div class="breadcrumb-header">{{ breadcrumbList }}</div>
    <div class="breadcrumb-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {
    breadcrumbList() {
      return this.generator(this.$route.name)
    }
  },

  methods: {
    generator(name) {
      return this.$i18n.t(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  padding: 20px 24px 12px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-header {
    font-size: 1.125rem;
    letter-spacing: 0;
    line-height: 1.5rem;
  }
}
</style>
