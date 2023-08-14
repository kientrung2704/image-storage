<template>
  <AppBreadcrumb>
    <template #content>
      <button @click="shareUser">Chia sẻ người thân</button>
    </template>
  </AppBreadcrumb>
  <div class="main">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Bạn đã chia sẻ">
        <div class="shared">
          <div class="shared-header">Bạn đã chia sẻ cho {{ shared?.shared?.length }} người</div>
          <div class="shared-list" v-if="shared.shared && shared.shared.length > 0">
            <div class="list-content" v-for="(share, key) in shared.shared" :key="key">
              <div class="user-list">
                <a-avatar
                  :size="48"
                  :src="
                    share.user.avatar ??
                    'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
                  "
                  :style="{
                    backgroundColor: '#022ec6',
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                  }"
                >
                </a-avatar>
                {{ share.user.name }}
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Đã chia sẻ với bạn" force-render>
        <div class="shared">
          <div class="shared-header">Có {{ shared?.get?.length }} người chia sẻ cho bạn</div>
          <div class="shared-list" v-if="shared.get && shared.get.length > 0">
            <div
              class="list-content"
              v-for="(get, index) in shared.get"
              :key="index"
              @click="
                $router.push({
                  name: 'partner',
                  params: { id: get.from }
                })
              "
            >
              <div class="user-list">
                <a-avatar
                  :size="32"
                  :src="
                    get.user.avatar ??
                    'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
                  "
                  :style="{
                    backgroundColor: '#022ec6',
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                  }"
                >
                </a-avatar>
                <span class="ml-6"> Ảnh của {{ get.user.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <!-- Có {{ shared.length }} người chia sẻ với bạn

    <div v-for="(share, key) in shared" :key="key">
      <div>
        <a-avatar
          :size="48"
          :src="
            share.user.avatar ??
            'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
          "
          :style="{ backgroundColor: '#022ec6', verticalAlign: 'middle', cursor: 'pointer' }"
        >
        </a-avatar>
        Ảnh của {{ share.user.name }}
      </div>
    </div> -->
  </div>
  <a-modal
    title="Chia sẻ người thân"
    :footer="null"
    v-model:open="visible"
    wrap-class-name="share-modal"
  >
    <div class="content">
      <a-select
        v-model:value="value"
        mode="multiple"
        placeholder="Select users"
        style="width: 100%"
        :filter-option="false"
        :not-found-content="fetching ? undefined : null"
        :options="data"
        @search="fetchUser"
      >
        <template v-if="fetching" #notFoundContent>
          <a-spin size="small" />
        </template>
      </a-select>

      <button @click="share">Xác nhận</button>
    </div>
  </a-modal>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import { debounce } from 'lodash-es'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeKey: '1',
      visible: false,
      value: [],
      data: [],
      fetching: false,
      shared: []
    }
  },
  computed: {
    ...mapGetters({ user: 'user/userInfo' })
  },
  async created() {
    await this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$store.dispatch('share/list')
      this.shared = res
    },
    shareUser() {
      if (this.user.access_limit.share === 0) {
        this.$notification[TYPE_ERROR]({
          message: this.$i18n.t('message.login.login'),
          description: 'Không đủ dung lượng chia sẻ'
        })
        return
      }

      if (
        this.user.access_limit.share > 0 &&
        this.user.access_limit.share === this.user.access_limit.shared
      ) {
        this.$notification[TYPE_ERROR]({
          message: this.$i18n.t('message.login.login'),
          description: 'Đã hết đủ dung lượng chia sẻ'
        })
        return
      }

      if (
        this.user.access_limit.share > 0 &&
        this.user.access_limit.share < this.user.access_limit.shared
      ) {
        this.visible = true
      }
    },
    fetchUser: debounce(async function (e) {
      if (e === '') {
        this.data = []
      } else {
        this.fetching = true
        const params = {
          keyword: e
        }
        const res = await this.$store.dispatch('share/findUser', params)
        const map = res.map((user) => ({
          label: `${user.email}`,
          value: user.id
        }))
        this.data = map
        console.log(this.data)
        this.fetching = false
      }
    }, 300),
    async share() {
      if (this.value.length === 0) return
      const params = {
        type: 'family',
        user: this.value
      }
      await this.$store.dispatch('share/share', params)
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.ant-tabs-tab) {
  padding: 0 0 12px 0;
}
:deep(.ant-tabs) {
  height: 100%;
}
.shared {
  height: 100%;

  &-header {
    margin-bottom: 12px;
    font-size: 18px;
  }

  &-list {
    margin-bottom: 12px;

    .list-content {
      cursor: pointer;
    }
  }
}
</style>
