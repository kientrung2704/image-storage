<template>
  <AppBreadcrumb>
    <template #content>
      <button @click="create">Tạo album</button>
    </template>
  </AppBreadcrumb>
  <div class="main">
    <div class="album">
      <div class="album-item" v-for="(album, index) in albums" :key="index">
        <img :src="'http://bveats-api.test/storage/' + album.files[0].file" alt="" />
        <div class="album-info">
          <div class="album-name two-line word-break" v-if="album.name">
            {{ album.name }}
          </div>
          <div class="album-total">{{ album.files.length }} mục</div>
        </div>
      </div>
    </div>

    <a-modal
      title=""
      width="100%"
      :footer="null"
      :closable="false"
      v-model:open="visible"
      wrap-class-name="cus-modal"
    >
      <div v-if="!isChooseImage">
        <!-- <transition-group tag="div" class="img-slider" :name="transition"> -->
        <div class="img-cont">
          <div class="category">
            <div class="category-wrapper">
              <div class="left">
                <div class="btn-category" @click="close">
                  <ArrowLeftOutlined :style="{ fontSize: '20px' }" />
                </div>
              </div>
              <div class="right">
                <a-space :size="8">
                  <div class="btn-category" @click="chooseImage">
                    <ShareAltOutlined :style="{ fontSize: '20px' }" />
                  </div>

                  <div class="btn-remove" @click="createAlbum">
                    <span class="text"> Tạo album</span>
                  </div>
                </a-space>
              </div>
            </div>
          </div>
          <div class="image mt-18">
            <div class="wrapper-content" v-if="!isChooseImage">
              <div class="album-name">
                <a-textarea v-model:value="name" size="large" placeholder="Tiêu đề" auto-size />
              </div>
              <div class="content-image mt-24">
                <div class="image" v-for="(image, i) in selected" :key="i">
                  <img class="img-responsive" :src="image.src" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </transition-group> -->
      </div>
      <div v-else>
        <div class="img-cont">
          <div class="category">
            <div class="category-wrapper">
              <div class="left">
                <div class="btn-category" @click="isChooseImage = false">
                  <ArrowLeftOutlined :style="{ fontSize: '20px' }" />
                </div>
              </div>
              <div class="right">
                <a-space :size="8">
                  <div class="btn-category" @click="continueCreate">Xong</div>
                </a-space>
              </div>
            </div>
          </div>
          <div class="image">
            <div class="wrapper-content">
              <div v-for="(months, index) in images" :key="index" class="content">
                <div class="content-time">{{ index }}</div>

                <div class="content-image">
                  <div class="image" v-for="(image, i) in months" :key="i" @click="select(image)">
                    <img class="img-responsive" :src="image.src" alt="image" />
                    <div class="img-responsive radio" v-if="isCheck(image.id)">
                      <a-radio class="absolute-radio" :checked="isCheck(image.id)"></a-radio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import {
  LeftOutlined,
  RightOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  MoreOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  ShareAltOutlined,
  UndoOutlined
  // CloseOutlined,
  // CalendarOutlined,
  // PictureOutlined,
  // CameraOutlined
} from '@ant-design/icons-vue'
import {
  IconCameraCog,
  IconPhotoExclamation,
  IconPhoto,
  IconCalendarTime,
  IconX,
  IconFileDescription
} from '@tabler/icons-vue'
export default {
  components: {
    LeftOutlined,
    RightOutlined,
    InfoCircleOutlined,
    ArrowLeftOutlined,
    MoreOutlined,
    DeleteOutlined,
    StarOutlined,
    StarFilled,
    ShareAltOutlined,
    UndoOutlined,
    // CloseOutlined,
    // CalendarOutlined,
    // PictureOutlined,
    // CameraOutlined,
    // MapboxMap,
    // MapboxMarker,
    IconCameraCog,
    IconPhotoExclamation,
    IconPhoto,
    IconCalendarTime,
    IconX,
    IconFileDescription
  },
  data() {
    return {
      name: '',
      albums: {},
      images: {},
      selected: [],
      visible: false,
      isChooseImage: false
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.isChooseImage = false
        this.name = ''
        this.selected = []
      }
    }
  },
  computed: {
    formatListImage() {
      let imagesList = []

      for (const property in this.selected) {
        imagesList.push(this.selected[property])
      }

      return imagesList
    }
  },
  created() {
    this.getAlbums()
  },
  methods: {
    async getAlbums() {
      this.$root.$refs.loading.start()
      const res = await this.$store.dispatch('album/list')
      this.albums = res
      this.$root.$refs.loading.finish()
    },
    create() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    chooseImage() {
      this.isChooseImage = true
      this.getList()
    },
    continueCreate() {
      this.isChooseImage = false
    },
    async getList() {
      this.$root.$refs.loading.start()
      // this.images = {}
      const res = await this.$store.dispatch('photo/list')
      this.images = res
      this.$root.$refs.loading.finish()
    },
    select(image) {
      const index = this.selected.findIndex((item) => item.id === image.id)

      if (index >= 0) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(image)
        this.selected.sort((a, b) => a.id - b.id)
      }
    },
    isCheck(id) {
      const index = this.selected.findIndex((item) => item.id === id)

      if (index >= 0) {
        return true
      } else {
        return false
      }
    },
    async createAlbum() {
      if (this.selected.length === 0) {
        this.$notification[TYPE_ERROR]({
          message: 'Error',
          description: 'Cần lựa chọn ảnh'
        })
        return false
      }
      this.$root.$refs.loading.start()
      let imagesList = []

      for (const property in this.selected) {
        imagesList.push(this.selected[property]['id'])
      }

      const params = {
        file: imagesList,
        name: this.name
      }
      await this.$store.dispatch('album/create', params)
      await this.getAlbums()
      this.close()
      this.$root.$refs.loading.finish()
    }
  }
}
</script>

<style lang="scss">
.cus-modal {
  .ant-modal-wrap {
    overflow: hidden !important;
  }

  .ant-modal {
    padding: 0 !important;
    max-width: 100%;
    top: 0 !important;
    // padding-bottom: 0;
    margin: 0;
    background-color: #fff !important;
  }
  .ant-modal-content {
    padding: 0 !important;
    border-radius: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    height: calc(100vh) !important;
  }
  .ant-modal-body {
    padding: 0 !important;
    flex: 1 !important;
  }
}
</style>

<style lang="scss" scope>
.album {
  gap: 24px;
  display: flex;
  flex-wrap: wrap;

  &-item {
    width: 219px;
    height: 283px;
    cursor: pointer;

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

.wrapper-content {
  padding: 0 24px;
  .content:last-child {
    padding-bottom: 0;
  }
  .content {
    padding-bottom: 24px;

    &-time {
      font-size: 16px;
      margin-bottom: 18px;
    }

    &-image {
      display: flex;
    }
    .content-image {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      .image {
        position: relative;
        height: 180px;

        .img-responsive {
          height: 180px;
          width: 100%;
        }

        .radio {
          position: absolute;
          top: 0;

          .absolute-radio {
            position: absolute;
            top: 5px;
            right: 0px;
          }
        }
      }
    }
  }
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
</style>
