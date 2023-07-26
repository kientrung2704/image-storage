<template>
  <div class="breadcrumb">
    <div class="breadcrumb-header">
      <router-link :to="{ name: 'image' }">
        <IconSmartHome stroke-width="1.25" :size="18" color="#86909A" />
      </router-link>

      <span class="seperator">/</span>
      {{ breadcrumbList }}
    </div>
    <div class="breadcrumb-content" id="breadcrumb-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { IconSmartHome } from '@tabler/icons-vue'
export default {
  components: {
    IconSmartHome
  },
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
  padding: 8px 24px;
  border-bottom: 1px solid #00000026;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;

  &-header {
    display: flex;
    align-items: center;
    // font-size: 1.125rem;
    letter-spacing: 0;
    line-height: 1;

    .seperator {
      margin-inline: 6px;
      color: #c5d1db;
    }
  }
}
</style>
