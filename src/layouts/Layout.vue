<template>
  <a-layout class="unvue-layout">
    <a-layout-header class="unvue-header unvue-header-light">
      <!-- Header -->
      <div class="unvue-header-left">
        <Logo v-if="!isMobile" />
        <menu-outlined @click="toggleCollapsed" />
      </div>
      <div class="unvue-header-right">
        <Header />
      </div>
      <!-- <a-button type="text" style="margin-bottom: 16px" @click="toggleCollapsed">
        <menu-outlined />
      </a-button> -->
    </a-layout-header>
    <!-- <a-layout-sider v-if="isSider" :theme="siderTheme">Sider</a-layout-sider> -->
    <a-layout class="unvue-layout-content">
      <Sider v-if="!isMobile" ref="sider" :collapsed="collapsed" />
      <a-drawer
        v-if="isMobile"
        :width="250"
        :closable="false"
        placement="left"
        :visible="collapsed"
        @close="toggleCollapsed"
      >
        <Logo class="ml-24 py-12" />
        <Sider ref="sider" />
      </a-drawer>
      <a-layout-content>
        <!-- <a-layout-header
          v-if="isSider"
          class="unvue-header"
          :class="isHeaderLight ? 'unvue-header-light' : 'unvue-header-dark'"
        >
          Header
        </a-layout-header> -->
        <div class="unvue-content">
          <!-- Layout：
          <a-radio-group v-model:value="layout">
            <a-radio-button value="top">top</a-radio-button>
            <a-radio-button value="mix">mix</a-radio-button>
            <a-radio-button value="sider">sider</a-radio-button>
          </a-radio-group>
          <br />
          Header Theme：
          <a-radio-group v-model:value="headerTheme">
            <a-radio-button value="light">light</a-radio-button>
            <a-radio-button value="dark">dark</a-radio-button>
          </a-radio-group>
          <br />
          <template v-if="!isTop">
            Sider Theme：
            <a-radio-group v-model:value="siderTheme">
              <a-radio-button value="light">light</a-radio-button>
              <a-radio-button value="dark">dark</a-radio-button>
            </a-radio-group>
            <br />
          </template>
          链接：
          <a-space>
            <RouterLink to="/dashboard/analysis">Analysis</RouterLink>
            <RouterLink to="/dashboard/settings">Settings</RouterLink>
          </a-space>
          <br />
          <br />
          <br /> -->
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { MenuOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    MenuOutlined
  },
  data() {
    return {
      collapsed: false,
      isMobile: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })

    this.checkMobileMode()
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    showSideDrawder: {
      get: function () {
        return this.isMobile && this.collapsed
      },
      set: function (val) {
        this.collapsed = val
      }
    },
    fixedHeader() {
      return 'absolute'
    }
  },
  methods: {
    onResize() {
      const curWidth = document.body.clientWidth
      if (curWidth <= 1100) {
        this.collapsed = true
      } else {
        this.collapsed = false
      }
      this.checkMobileMode()
    },
    checkMobileMode() {
      if (document.body.clientWidth <= 800) {
        this.isMobile = true
        this.collapsed = false
      } else {
        this.isMobile = false
      }
    },
    toggleCollapsed() {
      // this.$refs.sider.toggleCollapsed()
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<!-- <script setup>
import { ref } from 'vue'
import { MenuOutlined } from '@ant-design/icons-vue'

const sider = ref(null)

const toggleCollapsed = () => {
  sider.value.toggleCollapsed()
  // collapsed.value = !collapsed.value
}
</script> -->
<style lang="scss" scoped>
.unvue-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  height: 100%;
  @media (max-width: 800px) {
    .unvue-header {
      padding: 0 8px !important;
    }
  }
  .unvue-header {
    display: flex;
    align-items: center;
    line-height: unset;
    height: 64px;
    padding: 0 24px;
    transition: all 0.2s;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    .unvue-header-left {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      height: 48px;
    }
    .unvue-header-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: 48px;
      height: 48px;
      .header-item-container {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 8px;
        .header-item {
          cursor: pointer;
          a {
            color: unset;
          }
        }
      }
    }
    .unvue-header-menu {
      display: flex;
      flex: 1;
      height: 48px;
      align-items: center;
      .unvue-header-menu-container {
        height: 48px;
        line-height: 48px;
        .ant-menu-horizontal {
          border-bottom: none;
        }
        .ant-menu {
          transition: background 0.2s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
        }
      }
    }
  }
  .unvue-layout-content {
  }
  .unvue-header-light {
    background: #fff;
  }
  .unvue-header-dark {
    color: #fff;
  }
  .unvue-layout-sider-dark {
    color: #fff;
  }
  .unvue-content {
    background-color: #fff;
    height: 100%;
    overflow: scroll;
  }
}

:deep(.ant-menu-item) {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  height: 45px !important;
}

:deep(.ant-menu) {
  padding-right: 15px;
  height: 45px !important;
}

:deep(.ant-menu-item::after, .ant-menu-item::after) {
  border-right: none !important;
}

:deep(.ant-menu-title-content) {
  margin-left: 24px !important;
}
</style>
