<template>
  <div class="breadcrumb">{{ breadcrumbList }}</div>
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

<style lang="scss">
.breadcrumb {
  font-size: 1.125rem;
  letter-spacing: 0;
  line-height: 1.5rem;
}
</style>
