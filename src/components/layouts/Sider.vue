<template>
  <a-layout-sider
    :trigger="null"
    :collapsed="collapsed"
    collapsible
    :theme="siderTheme"
    :inline-collapsed="collapsed"
    width="250"
    class="cust-sider"
  >
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="light"
      @select="onSelect"
    >
      <!-- <div class="mt-18 mb-12 pl-15" v-if="!collapsed">
        <a-button @click="openModal" size="large" shape="round" block>
          <template #icon>
            <UploadOutlined />
          </template>
          Upload
        </a-button>
      </div> -->
      <a-menu-item
        key="image"
        @mouseover="hoverMenu('image')"
        @mouseleave="hoverMenu"
        :class="canHover('image')"
      >
        <template #icon>
          <PictureOutlined :style="{ fontSize: '20px' }" />
        </template>
        {{ $i18n.t('image') }}
      </a-menu-item>

      <div v-if="!collapsed" class="py-18 pl-15">
        <span class="f-600">{{ $i18n.t('libary') }}</span>
      </div>
      <a-divider class="my-12" v-else />

      <a-menu-item
        key="like"
        @mouseover="hoverMenu('like')"
        @mouseleave="hoverMenu"
        :class="canHover('like')"
      >
        <template #icon>
          <StarOutlined :style="{ fontSize: '20px' }" />
        </template>
        {{ $i18n.t('like') }}
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  PictureOutlined,
  UploadOutlined,
  SearchOutlined,
  PieChartOutlined,
  TeamOutlined,
  StarOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
export default {
  components: {
    PictureOutlined,
    UploadOutlined,
    SearchOutlined,
    PieChartOutlined,
    TeamOutlined,
    StarOutlined,
    DeleteOutlined
  },
  props: ['collapsed'],
  data() {
    return {
      siderTheme: 'light',
      selectedKeys: ['image'],
      openKeys: [],
      isHover: false
    }
  },

  methods: {
    // toggleCollapsed() {
    //   this.collapsed = !this.collapsed
    // },
    onSelect(e) {
      this.$router.push({ name: e.key })
    },
    canHover(key) {
      return this.isHover === key && this.selectedKeys[0] != key ? 'menu-item-hover' : ''
    },
    openModal() {
      this.$root.$refs.upload.showModal()
    },

    hoverMenu(key) {
      return (this.isHover = key ? key : '')
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  background-color: rgb(218, 220, 224);
  height: 1px;
  margin: 19px 24px 20px;
}

:deep(.menu-item-hover) {
  background-color: rgb(241, 243, 244) !important;

  .ant-menu-title-content {
    color: #000000d9 !important;
  }

  svg {
    fill: #000000d9 !important;
  }
}

.cust-sider {
  border-right: 1px solid #00000026 !important;
}

:deep(.ant-menu) {
  border: none !important;
}

:deep(.ant-menu-item:first-child) {
  margin-top: 15px !important;
}

:deep(.ant-menu-light) {
  border: none !important;
}

:deep(.ant-menu-root) {
  border: none !important;
}

:deep(.ant-menu-vertical) {
  border: none !important;
}

:deep(.ant-menu-inline-collapsed) {
  border: none !important;
}

:deep(.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left) {
  border: none !important;
}

:deep(
    .ant-menu.ant-menu-inline-collapsed > .ant-menu-item .ant-menu-item-icon,
    .ant-menu.ant-menu-inline-collapsed
      > .ant-menu-item-group
      > .ant-menu-item-group-list
      > .ant-menu-item
      .ant-menu-item-icon,
    .ant-menu.ant-menu-inline-collapsed
      > .ant-menu-item-group
      > .ant-menu-item-group-list
      > .ant-menu-submenu
      > .ant-menu-submenu-title
      .ant-menu-item-icon,
    .ant-menu.ant-menu-inline-collapsed
      > .ant-menu-submenu
      > .ant-menu-submenu-title
      .ant-menu-item-icon,
    .ant-menu.ant-menu-inline-collapsed > .ant-menu-item .anticon,
    .ant-menu.ant-menu-inline-collapsed
      > .ant-menu-item-group
      > .ant-menu-item-group-list
      > .ant-menu-item
      .anticon,
    .ant-menu.ant-menu-inline-collapsed
      > .ant-menu-item-group
      > .ant-menu-item-group-list
      > .ant-menu-submenu
      > .ant-menu-submenu-title
      .anticon,
    .ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon
  ) {
  line-height: 50px !important;
}
</style>
