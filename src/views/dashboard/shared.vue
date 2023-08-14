<template>
  <AppBreadcrumb> </AppBreadcrumb>
  <div class="main">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Photos">
        <div class="shared">
          <div v-if="shared.files && shared.files.length === 0" class="shared-header">
            Bạn đã hiện tại không chia sẻ ảnh
          </div>
          <div class="content-image">
            <div class="image" v-for="(image, i) in shared?.files" :key="i">
              <img
                class="img-responsive"
                :src="'http://image-storage-be.test/storage/' + image.file.file"
                alt="image"
              />
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Albums" force-render>
        <div class="shared">
          <div v-if="shared.albums && shared.albums.length === 0" class="shared-header">
            Bạn đã hiện tại không chia sẻ album
          </div>
          <div class="album" v-else>
            <div class="album-item" v-for="(album, index) in shared.albums" :key="index">
              <a-dropdown class="more">
                <a @click.prevent>
                  <more-outlined :style="{ fontSize: '24px', color: '#fff' }" />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <span @click="removeAlbum(album.album.id)">Xoá album</span>
                    </a-menu-item>
                  </a-menu>
                </template>

                <!-- <a-popover placement="bottomRight">
            <template #content> 11 </template>
            <more-outlined :style="{ fontSize: '24px', color: '#fff' }" />
          </a-popover> -->
              </a-dropdown>
              <router-link :to="{ name: 'explore-detail', params: { id: album.album.id } }">
                <img
                  :src="'http://image-storage-be.test/storage/' + album.album.files[0]?.file"
                  alt=""
                />
                <div class="album-info">
                  <div class="album-name two-line word-break" v-if="album.album.name">
                    {{ album.album.name }}
                  </div>
                  <div class="album-total">{{ album.album.files.length }} mục</div>
                </div>
              </router-link>
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
import { MoreOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    MoreOutlined
  },
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
      const res = await this.$store.dispatch('share/shared')
      this.shared = res
    },
    shareUser() {
      // if (this.user.access_limit.share === 0) {
      //   this.$notification[TYPE_ERROR]({
      //     message: this.$i18n.t('message.login.login'),
      //     description: 'Không đủ dung lượng chia sẻ'
      //   })
      //   return
      // }

      // if (
      //   this.user.access_limit.share > 0 &&
      //   this.user.access_limit.share === this.user.access_limit.shared
      // ) {
      //   this.$notification[TYPE_ERROR]({
      //     message: this.$i18n.t('message.login.login'),
      //     description: 'Đã hết đủ dung lượng chia sẻ'
      //   })
      //   return
      // }

      // if (
      //   this.user.access_limit.share > 0 &&
      //   this.user.access_limit.share < this.user.access_limit.shared
      // ) {
      this.visible = true
      // }
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
.album {
  gap: 24px;
  display: flex;
  flex-wrap: wrap;

  &-item:hover {
    .more {
      display: block;
    }
  }

  &-item {
    position: relative;
    width: 219px;
    height: 283px;
    cursor: pointer;

    .more {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
    }

    img {
      object-fit: cover;
      border-radius: 8px;
      height: 219px;
      overflow: hidden;

      width: 100%;
    }

    .album-info {
      height: 64px;

      .album-name {
        font-size: 16px;
        margin-top: 8px;
        font-weight: 500;
      }

      .album-total {
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
}

.img-cont {
  height: 64px;
  // position: absolute;
  // top: 0;
  // left: 0;
  // bottom: 0;
  // right: 0;

  .btn-category {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .btn-remove:hover {
    background-color: #33333390;
    color: #fff;
  }

  .btn-remove {
    padding: 0 8px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .text {
      // margin-left: 12px;
      // color: #fff;
      font-weight: 600;
    }
  }

  .category {
    // position: absolute;

    width: 100%;
    height: 100%;
    // z-index: 1099;

    // margin-left: 12px;
    // margin-right: 12px;

    &-wrapper {
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 12px;
      height: 100%;

      .left {
        display: flex;
        align-items: center;
      }

      .right {
        display: flex;
        align-items: center;
      }
    }
  }
}
.shared {
  height: 100%;

  &-header {
    margin-bottom: 12px;
    font-size: 18px;
  }

  .content-image {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    .image {
      height: 180px;

      .img-responsive {
        height: 180px;
        width: 100%;
      }
    }
  }

  &-list {
    margin-bottom: 12px;

    .list-content {
      cursor: pointer;
    }
  }
}
</style>
