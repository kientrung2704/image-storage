<template>
  <div class="header-item-container">
    <a-space size="middle">
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
          <question-circle-outlined style="font-size: 20px" />
        </a-tooltip>
      </div>
      <div class="header-item" @click="toggleFullscreen">
        <a-tooltip placement="bottom">
          <template #title>Setting</template>
          <setting-outlined style="font-size: 20px" />
        </a-tooltip>
      </div>
      <div class="header-item">
        <a-dropdown trigger="click">
          <a-avatar>
            {{ userName }}
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <template #icon>
                  <user-outlined />
                </template>
                我的信息
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <user-switch-outlined />
                </template>
                切换角色
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <poweroff-outlined />
                </template>
                安全退出
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
export default {
  components: {
    QuestionCircleOutlined,
    PoweroffOutlined,
    UserSwitchOutlined,
    UserOutlined,
    SettingOutlined
  },
  data() {
    return {
      userName: 'NTK'
    }
  },
  methods: {
    openModal() {
      this.$root.$refs.upload.showModal()
    }
  }
}
</script>
