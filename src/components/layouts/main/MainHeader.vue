<template>
  <div class="header">
    <div class="header_ctn jtf_between">
      <div class="l-header_logo">
        <div class="l-header_logo-img">
          <router-link to="main">
            <img src="@/assets/images/cfind-logo.png" alt="" />
          </router-link>
        </div>
        <div class="l-header_logo-title">AAAA</div>
      </div>
      <div class="l-header_nav">
        <div class="l-header_center">
          <div class="service">
            <a href="http://" target="_blank" class="text-menu">Bảng giá</a>
            <div class="underline"></div>
          </div>
          <div class="service">
            <a href="http://" target="_blank" class="text-menu">Bảng giá</a>
            <div class="underline"></div>
          </div>
          <div class="service">
            <a href="http://" target="_blank" class="text-menu">Bảng giá</a>
            <div class="underline"></div>
          </div>
          <div class="service">
            <a href="http://" target="_blank" class="text-menu">Bảng giá</a>
            <div class="underline"></div>
          </div>
        </div>

        <!-- <div class="l-header_btn-icon">
          <img
            @click="onOpen"
            src="https://img.icons8.com/ios/50/000000/menu--v6.png"
            class="menu-icon"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSideMenu: false
    }
  },

  methods: {
    onOpen() {
      this.showSideMenu = true
    },
    onClose() {
      this.showSideMenu = false
    }
  }
}
</script>
