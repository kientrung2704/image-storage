<template>
  <a-layout-sider
    :trigger="null"
    :collapsed="collapsed"
    collapsible
    :theme="siderTheme"
    :inline-collapsed="collapsed"
    width="250"
  >
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="light"
      @select="onSelect"
    >
      <div class="mb-18 pl-15" v-if="!collapsed">
        <a-button @click="openModal" size="large" shape="round" block>
          <template #icon>
            <UploadOutlined />
          </template>
          Upload
        </a-button>
      </div>
      <a-menu-item key="Dashboard">
        <template #icon>
          <PictureOutlined :style="{ fontSize: '18px' }" />
        </template>
        {{ $i18n.t('image') }}
      </a-menu-item>

      <a-menu-item key="Dashboard1">
        <template #icon>
          <SearchOutlined :style="{ fontSize: '18px' }" />
        </template>
        {{ $i18n.t('search') }}
      </a-menu-item>
      <!-- <div class="mt-48"></div> -->
      <a-divider class="my-12" />
      <!-- <div class="divider"></div> -->
      <a-menu-item key="Dashboard2">
        <template #icon>
          <SettingOutlined :style="{ fontSize: '18px' }" />
        </template>
        Navigation Three
      </a-menu-item>
      <div class="pl-24" v-if="!collapsed">
        <a-progress :percent="30" size="small" />
      </div>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  PictureOutlined,
  SettingOutlined,
  UploadOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
export default {
  components: {
    PictureOutlined,
    SettingOutlined,
    UploadOutlined,
    SearchOutlined
  },
  props: ['collapsed'],
  data() {
    return {
      siderTheme: 'light',
      selectedKeys: ['Dashboard'],
      openKeys: []
    }
  },

  methods: {
    // toggleCollapsed() {
    //   this.collapsed = !this.collapsed
    // },
    onSelect(e) {
      this.$router.push({ name: e.key })
    },
    openModal() {
      this.$root.$refs.upload.showModal()
    }
  }
}
</script>

<style lang="scss">
.divider {
  background-color: rgb(218, 220, 224);
  height: 1px;
  margin: 19px 24px 20px;
}
</style>
