<template>
  <div class="header-item-container" :class="$route.name !== 'image' ? 'fl-end' : ''">
    <div class="search">
      <input
        type="text"
        v-model="search"
        class="form-input"
        placeholder="Basic usage"
        v-if="$route.name === 'image'"
      />
      <SearchOutlined type="user" class="search-icon" />
    </div>
    <!-- <template #prefix>
        <SearchOutlined type="user" />
      </template>
    </input> -->
    <a-space size="large">
      <!-- <div class="header-item">
        <a href="https://github.com/zhangbo0921/vue-antd-admin" target="_blank">
          <a-tooltip placement="bottom">
            <template #title>仓库</template>
            <github-outlined style="font-size: 20px" />
          </a-tooltip>
        </a>
      </div> -->
      <!-- <div class="header-item">
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
      </div> -->
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
                <span class="item-detail"> Lịch sử thanh toán </span>
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
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
import { IconUser, IconLock, IconLogout } from '@tabler/icons-vue'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash-es'
export default {
  components: {
    QuestionCircleOutlined,
    PoweroffOutlined,
    UserSwitchOutlined,
    UserOutlined,
    SettingOutlined,
    IconUser,
    IconLock,
    IconLogout,
    SearchOutlined
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
      search: ''
    }
  },
  computed: {
    ...mapGetters({ user: 'user/userInfo' })
  },
  watch: {
    search: debounce(async function (oldValue, newValue) {
      this.$store.commit('photo/SET_SEARCH', this.search)
    }, 500)
    // search(oldValue, newValue) {
    //   this.$store.commit('photo/SET_SEARCH', newValue)
    // }
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
.fl-end {
  justify-content: flex-end !important;
}
.search {
  max-width: 900px;
  width: 100%;
  position: relative;

  &-icon {
    position: absolute;
    right: 15px;
    cursor: pointer;
  }
}

.form-input {
  width: 100%;
  padding: 6px 12px;
  background: 0 0;
  border: none;
  border-radius: 6px;
  color: #000000de;
  font-weight: 400;
  letter-spacing: 0.00937em;
  line-height: 28px;
  outline: 0;
  text-decoration: inherit;
  text-transform: inherit;
  // background-color: #f2f6f8;
  border: 1px solid #00000026;
  height: 40px;
}
.cust-menu {
  min-width: 180px;
  .item-detail {
    margin-left: 5px;
    // font-size: 16px;
  }
}
</style>
