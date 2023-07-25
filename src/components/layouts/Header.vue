<template>
  <div class="header-item-container">
    <a-space size="large">
      <!-- <div class="header-item">
        <a href="https://github.com/zhangbo0921/vue-antd-admin" target="_blank">
          <a-tooltip placement="bottom">
            <template #title>仓库</template>
            <github-outlined style="font-size: 20px" />
          </a-tooltip>
        </a>
      </div> -->
      <div class="header-item">
        <a-tooltip placement="bottom">
          <template #title>{{ $i18n.t('support') }}</template>
          <question-circle-outlined style="font-size: 20px; color: #86909a" />
        </a-tooltip>
      </div>
      <div class="header-item" @click="toggleFullscreen">
        <a-tooltip placement="bottom">
          <template #title>Setting</template>
          <setting-outlined style="font-size: 20px; color: #86909a" />
        </a-tooltip>
      </div>
      <div class="header-item">
        <a-dropdown trigger="hover">
          <a-avatar
            :src="user.avatar"
            :style="{ backgroundColor: '#022ec6', verticalAlign: 'middle', cursor: 'pointer' }"
          >
            {{ user.firt_name }}
          </a-avatar>
          <template #overlay>
            <a-menu class="cust-menu" @click="changeRouter">
              <a-menu-item key="general">
                <template #icon>
                  <IconUser stroke-width="2.5" :size="18" color="#86909A" />
                </template>
                <span class="item-detail"> Profile </span>
              </a-menu-item>
              <a-menu-item key="payment-history">
                <template #icon>
                  <IconLock stroke-width="2.5" :size="18" color="#86909A" />
                </template>
                <span class="item-detail"> Login history </span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item>
                <template #icon>
                  <IconLogout stroke-width="2.5" :size="18" color="#86909A" />
                </template>
                <span class="item-detail"> Logout </span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-space>
  </div>
</template>

<script>
import {
  QuestionCircleOutlined,
  PoweroffOutlined,
  UserSwitchOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { IconUser, IconLock, IconLogout } from '@tabler/icons-vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    QuestionCircleOutlined,
    PoweroffOutlined,
    UserSwitchOutlined,
    UserOutlined,
    SettingOutlined,
    IconUser,
    IconLock,
    IconLogout
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: []
    }
  },
  computed: {
    ...mapGetters({ user: 'user/userInfo' })
  },
  methods: {
    async changeRouter(router) {
      if (!router.key) {
        await this.$store.dispatch('auth/logOut')
        this.$router.push({ name: 'main' })
      } else {
        this.$router.push({ name: router.key })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cust-menu {
  min-width: 180px;
  .item-detail {
    margin-left: 5px;
    // font-size: 16px;
  }
}
</style>
