<template>
  <div class="header">
    <div class="header_ctn jtf_between">
      <div class="l-header_logo">
        <!-- <div class="l-header_logo-img">
          <router-link to="main">
            <img src="@/assets/images/cfind-logo.png" alt="" />
          </router-link>
        </div> -->
        <router-link :to="{ name: 'main' }">
          <div class="l-header_logo-title">CopyCase</div>
        </router-link>
      </div>
      <div class="l-header_nav">
        <div class="l-header_center">
          <router-link v-if="!isEmpty(user)" class="service-login" :to="{ name: 'image' }">
            Dashboard
          </router-link>
          <router-link v-else class="service-login" :to="{ name: 'login' }"> Login </router-link>
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
import { isEmpty } from '@/utils/common/is'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showSideMenu: false
    }
  },
  computed: {
    ...mapGetters({ user: 'user/userInfo' })
  },
  methods: {
    isEmpty,
    onOpen() {
      this.showSideMenu = true
    },
    onClose() {
      this.showSideMenu = false
    }
  }
}
</script>
