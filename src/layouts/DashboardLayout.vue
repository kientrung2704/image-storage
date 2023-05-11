<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider
      v-if="!isMobile"
      class="layout-sider"
      collapse-mode="width"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :collapsed="collapsed"
      :collapsed-width="64"
      :width="200"
      show-trigger="arrow-circle"
    >
      <div :class="{ header: !collapsed, 'm-header': collapsed }">HOLA</div>
      <PageSideBar />
    </n-layout-sider>
    <n-drawer
      v-model:show="showSideDrawder"
      :width="200"
      :placement="'left'"
      class="layout-side-drawer"
    >
      <div :class="{ header: !collapsed, 'm-header': collapsed }">HOLA</div>
      <PageSideBar />
    </n-drawer>

    <!-- <div class="layout-wrapper">
      <header :style="`height: 70px`">
        <PageHeader v-model:collapsed="collapsed" />
      </header>
      <section class="layout-content">
        <router-view></router-view>
      </section>
    </div> -->
    <n-layout>
      <n-layout-header :style="{ height: '70px' }">
        <PageHeader v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout style="background-color: #e5eaec" :style="`height: calc(100% - 70px)`">
        <section class="layout-content">
          <router-view></router-view>
        </section>
        <n-back-top :bottom="25" :right="25" />
      </n-layout>
    </n-layout>

    <!-- <n-layout>
      <n-layout-header position="static">
        <PageHeader v-model:collapsed="collapsed" />
      </n-layout-header>
      <n-layout-content class="layout-content">
        <div class="layout-content-main">
          <div class="main-view main-view-fix">
            <router-view></router-view>
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout> -->
  </n-layout>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="scss">
.layout-full {
  width: 100%;
  height: 100%;
}
.article-content {
  flex: 1 1 0%;
  overflow: hidden;
}
</style>
