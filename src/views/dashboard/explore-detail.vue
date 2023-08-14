<template>
  <AppBreadcrumb>
    <template #content v-if="album.user_id === user.id">
      <button @click="addFile" class="add-file">Edit</button>
    </template>
  </AppBreadcrumb>
  <div class="main">
    <div class="name">{{ album.name }}</div>
    <div class="user-list" v-if="album.shares?.length > 0">
      <a-tooltip>
        <template #title>{{ album.user.name }} (Chủ sở hữu)</template>
        <a-avatar
          :size="40"
          :src="
            album.user.avatar
              ? 'http://image-storage-be.test/storage/upload/' + album.user.avatar
              : 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
          "
          :style="{
            verticalAlign: 'middle',
            cursor: 'pointer'
          }"
        >
        </a-avatar>
      </a-tooltip>

      <a-tooltip v-for="(share, i) in album.shares" :key="i">
        <template #title>{{ share.to.name }}</template>
        <a-avatar
          :size="40"
          :src="
            share.to.avatar
              ? 'http://image-storage-be.test/storage/upload/' + share.to.avatar
              : 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
          "
          :style="{
            verticalAlign: 'middle',
            cursor: 'pointer'
          }"
        >
        </a-avatar>
      </a-tooltip>

      <button @click="shareAlbum">
        <PlusOutlined />
      </button>
      <!-- <div class="list" v-for="(share, i) in album.shares" :key="i">
        {{ share.user.name }}
      </div> -->
    </div>
    <div class="album">
      <div
        class="album-item"
        v-for="(file, index) in files"
        :key="index"
        @click="clickPhoto(file.id)"
      >
        <img :src="'http://image-storage-be.test/storage/' + file.file" alt="" />
        <!-- <div class="album-info">
          <div class="album-name two-line word-break" v-if="file.name">
            {{ file.name }}
          </div>
          <div class="album-total">{{ file.description }}</div>
        </div> -->
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
        <div class="img-cont">
          <div class="header-category">
            <div class="header-category-wrapper">
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
      </div>
      <div v-else>
        <div class="img-cont">
          <div class="header-category-category">
            <div class="header-category-wrapper">
              <div class="left">
                <div class="btn-category" @click="close">
                  <ArrowLeftOutlined :style="{ fontSize: '20px' }" />
                </div>
              </div>
              <div class="right">
                <a-space :size="8">
                  <div class="btn-category" @click="update">Update</div>
                </a-space>
              </div>
            </div>
          </div>
          <div class="wrap-name">
            <input type="text" name="" id="" class="name" v-model="albumName" />
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

    <a-modal
      title=""
      width="100%"
      :footer="null"
      :closable="false"
      v-model:open="view"
      wrap-class-name="full-modal"
      @keydown="keyboardActionDialog($event)"
    >
      <AppImageGallery
        ref="viewer"
        @left="navigate(-1)"
        @right="navigate(1)"
        :nextPhoto="nextPhoto"
        :prevPhoto="prevPhoto"
        :current-photo="currentPhoto"
        :direction="imageViewerDirection"
        @close="closeView()"
        @like-file="likeFile"
      />
    </a-modal>

    <a-modal
      title="Thêm người thân"
      :footer="null"
      v-model:open="display"
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
          @search="fetchUserData"
        >
          <template v-if="fetching" #notFoundContent>
            <a-spin size="small" />
          </template>
        </a-select>

        <button class="mt-12" @click="share">Xác nhận</button>
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
  UndoOutlined,
  PlusOutlined
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
import { debounce } from 'lodash-es'
import { mapGetters } from 'vuex'
export default {
  components: {
    PlusOutlined,
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
      album: {},
      images: {},
      selected: [],
      files: [],
      visible: false,
      view: false,
      isChooseImage: false,
      albumName: '',
      currentPhoto: null,
      prevPhoto: null,
      nextPhoto: null,
      imageViewerDirection: 0,
      totalPhoto: 0,
      value: [],
      data: [],
      fetching: false,
      id: '',
      display: false
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
    ...mapGetters({ user: 'user/userInfo' }),
    formatListImage() {
      let imagesList = []

      for (const property in this.selected) {
        imagesList.push(this.selected[property])
      }

      return imagesList
    }
  },
  created() {
    this.getAlbum()
  },
  methods: {
    async getAlbum() {
      this.$root.$refs.loading.start()
      const res = await this.$store.dispatch('album/detail', this.$route.params.id)
      this.album = res
      this.files = res.files ?? []
      this.totalPhoto = this.files.length
      this.albumName = res.name
      this.$root.$refs.loading.finish()
      res.files.map((item) => {
        this.selected.push(item)
      })
    },
    shareAlbum() {
      this.display = true
    },
    fetchUserData: debounce(async function (e) {
      if (e === '') {
        this.data = []
      } else {
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
      this.$root.$refs.loading.start()
      const params = {
        type: 'album',
        user: this.value,
        album_id: this.$route.params.id
      }

      await this.$store.dispatch('share/share', params)
      this.display = false
      await this.getAlbum()
      this.$root.$refs.loading.finish()
    },

    create() {
      this.visible = true
    },
    addFile() {
      this.getList()
      this.getAlbum()
      this.isChooseImage = true
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
    },
    async update() {
      if (this.selected.length === 0) {
        this.$notification[TYPE_ERROR]({
          message: 'Error',
          description: 'Cần lựa chọn ảnh'
        })
        return false
      }
      if (!this.albumName) {
        this.$notification[TYPE_ERROR]({
          message: 'Error',
          description: 'Cần đặt tên album'
        })
        return false
      }
      const params = {
        id: this.album.id,
        name: this.albumName,
        selected: this.selected
      }
      const res = await this.$store.dispatch('album/update', params)
      this.$notification[TYPE_SUCCESS]({
        message: 'Success',
        description: 'Update successfully'
      })
      await this.getAlbum()
      this.close()
    },
    clickPhoto(id) {
      const index = this.files.findIndex((e) => e.id === id)
      if (index >= 0) {
        this.view = true
        this.imageViewerDirection = 0
        this.currentPhoto = {
          index: index,
          photo: this.files[index]
        }
        console.log(this.currentPhoto)
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      }
    },
    getNextSectionSegmentAsset(currentAsset, dir) {
      const assetLength = this.totalPhoto
      let nextIndex = currentAsset.index + dir
      let nextPhoto = this.files[nextIndex]
      if (nextIndex < 0) {
        nextIndex = 0
        nextPhoto = currentAsset.photo
      }
      if (nextIndex > assetLength - 1) {
        nextIndex = currentAsset.index
        nextPhoto = currentAsset.photo
      }
      return {
        index: nextIndex,
        photo: nextPhoto
      }
    },
    navigate(dir) {
      this.imageViewerDirection = dir
      if (dir === 1) {
        this.prevPhoto = this.currentPhoto
        this.currentPhoto = this.nextPhoto
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      } else {
        this.nextPhoto = this.currentPhoto
        this.currentPhoto = this.prevPhoto
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
      }
      // this.$refs.viewer.handleDescription()
    },
    keyboardActionDialog(event) {
      if (event.code == 'ArrowLeft') {
        if (this.currentPhoto.index === 0) return
        this.navigate(-1)
      } else if (event.code == 'ArrowRight') {
        this.navigate(1)
      } else if (event.code == 'Escape') {
        this.clearNav()
      }
    },
    clearNav() {
      this.currentPhoto = null
      this.prevPhoto = null
      this.nextPhoto = null
    },
    closeView() {
      this.view = false
      this.$nextTick(() => {
        this.clearNav()
      })
    }
  }
}
</script>

<style lang="scss">
.name {
  margin-bottom: 12px;
}
.cus-modal {
  .ant-modal-wrap {
    overflow: hidden !important;
  }

  .ant-modal {
    padding: 0;
    max-width: 100%;
    top: 0;
    // padding-bottom: 0;
    margin: 0;
    background-color: #fff !important;
  }
  .ant-modal-content {
    padding: 0;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    padding: 0 !important;
    flex: 1 !important;
  }
}
.ant-modal-wrap {
  overflow: hidden !important;
}
.full-modal {
  .ant-modal {
    padding: 0 !important;
    max-width: 100%;
    top: 0;
    // padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    padding: 0;
    display: flex;
    flex-direction: column;
    // height: calc(100vh);
    background-color: #000;
    border-radius: 0;
  }
  .ant-modal-body {
    padding: 0;
    flex: 1;
  }
}
</style>

<style lang="scss" scoped>
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

  .header-category {
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

.create-album {
  margin-right: 12px;
}

.wrap-name {
  padding-left: 24px;
  padding: 0 24px 24px;
  .name {
    border-bottom: 1px solid black;
  }
}

.user-list {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
