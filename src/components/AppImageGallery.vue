<template>
  <a-card class="cust-card" :bordered="false" ref="viewer" @mousemove="mouseMove">
    <div style="min-height: 100vh; display: flex">
      <div style="position: relative; flex: 1">
        <!-- <transition-group tag="div" class="img-slider" :name="transition"> -->
        <div class="img-cont">
          <div class="category" v-if="mousemove">
            <div class="category-wrapper">
              <div class="left">
                <div class="btn-category" @click="close">
                  <ArrowLeftOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                </div>
              </div>
              <div class="right">
                <a-space :size="!currentPhoto?.photo.deleted_at ? 8 : 12">
                  <div
                    @click="shareFile(currentPhoto?.photo.id)"
                    class="btn-category"
                    v-if="!currentPhoto?.photo.deleted_at && $route.name !== 'partner'"
                  >
                    <ShareAltOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>

                  <div
                    class="btn-remove"
                    v-if="currentPhoto?.photo.deleted_at && $route.name !== 'partner'"
                    @click="removeFile(currentPhoto?.photo.id, 'delete')"
                  >
                    <DeleteOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                    <span class="text">Xóa</span>
                  </div>
                  <div
                    class="btn-remove"
                    v-if="currentPhoto?.photo.deleted_at && $route.name !== 'partner'"
                    @click="removeFile(currentPhoto?.photo.id, 'undo')"
                  >
                    <UndoOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                    <span class="text">Khôi phục</span>
                  </div>
                  <div class="btn-category" @click="viewInfo">
                    <InfoCircleOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                  <div
                    class="btn-category"
                    v-if="!currentPhoto?.photo.deleted_at && $route.name !== 'partner'"
                    @click="likeFile(currentPhoto?.photo)"
                  >
                    <StarFilled
                      v-if="currentPhoto?.photo.like === 1"
                      :style="{ color: '#ffffff', fontSize: '20px' }"
                    />
                    <StarOutlined v-else :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                  <div
                    class="btn-category"
                    v-if="
                      !currentPhoto?.photo.deleted_at &&
                      currentPhoto?.photo?.albums?.length === 0 &&
                      $route.name !== 'partner'
                    "
                    @click="deteleFile(currentPhoto?.photo.id)"
                  >
                    <DeleteOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>

                  <div class="btn-category" v-if="!currentPhoto?.photo.deleted_at">
                    <MoreOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                </a-space>
              </div>
            </div>
          </div>
          <Transition class="img-slider" :name="transition">
            <div :key="currentPhoto?.photo.id" :id="currentPhoto?.photo.id">
              <img
                class="img-display"
                :src="
                  currentPhoto?.photo.src
                    ? currentPhoto?.photo.src
                    : 'http://bveats-api.test/storage/' + currentPhoto?.photo.file
                "
                v-if="currentPhoto"
              />
            </div>
          </Transition>
          <div
            class="btn-category"
            @click="left"
            style="position: absolute; top: 50%; left: 12px"
            v-if="mousemove"
          >
            <LeftOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
          </div>
          <div
            class="btn-category"
            style="position: absolute; top: 50%; right: 12px"
            @click="right"
            v-if="mousemove"
          >
            <RightOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
          </div>
        </div>
        <!-- </transition-group> -->
      </div>
      <Transition class="img-slider" name="category">
        <div key="3" class="info" v-show="info">
          <!-- <div> -->
          <div class="scroller" v-if="info">
            <div class="info-header">
              <!-- <div class="close-btn"> -->
              <div class="infomation">
                {{ $i18n.t('infomation') }}
              </div>
              <div class="btn-close" @click="viewInfo">
                <IconX stroke-width="1.25" :size="24" />
              </div>
              <!-- </div> -->
            </div>
            <div class="info-content" v-if="currentPhoto">
              <!-- {{ currentPhoto.photo }} -->
              <!-- <div class="content-infomation"></div> -->

              <div class="detail">
                <!-- <div class="detail-header mb-12">{{ $i18n.t('detail') }}</div> -->
                <div class="detail-content">
                  <div class="content-box align-center" v-if="!currentPhoto?.photo.deleted_at">
                    <div class="icon">
                      <IconFileDescription stroke-width="1.25" :size="24" />
                    </div>
                    <div class="content-detail">
                      <a-textarea
                        auto-size
                        @blur="handleFocusout"
                        v-model:value="currentPhoto.photo.description"
                        :placeholder="$i18n.t('description_placeholder')"
                      />
                    </div>
                  </div>
                  <div v-if="currentPhoto?.photo?.albums?.length > 0" class="album-list">
                    <div class="album-header">Album</div>
                    <div
                      v-for="(album, index) in currentPhoto?.photo.albums"
                      class="list-detail"
                      :key="index"
                    >
                      <router-link
                        @click.native="
                          $router
                            .push({ name: 'explore-detail', params: { id: album.id } })
                            .then(() => {
                              this.$router.go()
                            })
                        "
                        :to="{ name: 'explore-detail', params: { id: album.id } }"
                      >
                        <div class="detail-info">
                          <img
                            :src="'http://bveats-api.test/storage/' + album.files[0]?.file"
                            alt=""
                          />
                          <div class="album-info">
                            <div class="album-name one-line word-break" v-if="album.name">
                              {{ album.name }}
                            </div>
                            <div class="album-total">
                              {{ album.files.length }} mục - {{ formatDate(album.created_at) }}
                            </div>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>

                  <div class="content-box">
                    <div class="icon">
                      <IconCalendarTime stroke-width="1.25" :size="24" />
                    </div>
                    <div class="content-detail">
                      <div class="date-create">
                        {{ unixToDateTime.date }}
                      </div>
                      <div class="date-create" @click="datepicker = !datepicker">
                        {{ unixToDateTime.weekdaysShort }}, {{ unixToDateTime.time }}
                      </div>
                      <!-- {{ formatUnix(currentPhoto?.photo?.modified_at) }} -->
                      <!-- <a-date-picker
                        v-model:value="currentPhoto.photo.modified_at"
                        format="DD-MM-YYYY HH:mm:ss"
                        :show-time="{ defaultValue: defaultDateTime }"
                      /> -->
                    </div>
                  </div>
                  <div class="content-box">
                    <div class="icon">
                      <IconPhoto stroke-width="1.25" :size="24" />
                    </div>
                    <div class="content-detail">
                      <div class="file-name">
                        {{ currentPhoto?.photo?.name }}
                      </div>
                    </div>
                  </div>
                  <div class="content-box">
                    <div class="icon">
                      <IconPhotoExclamation stroke-width="1.25" :size="24" />
                    </div>
                    <div class="content-detail">
                      <div class="file-name">Size Info</div>
                      <div class="file-detail">
                        <a-space size="middle">
                          <span class="sub" v-if="currentPhoto.photo.exif.ImageSize">
                            {{ currentPhoto?.photo?.exif?.ImageSize }}
                          </span>
                          <span class="sub">{{ getFileSize(currentPhoto?.photo?.size) }} MB</span>
                        </a-space>
                      </div>
                    </div>
                  </div>

                  <div class="content-box" v-if="JSON.parse(currentPhoto?.photo?.exif)?.Make">
                    <div class="icon">
                      <IconCameraCog stroke-width="1.25" :size="24" />
                      <!-- <CameraOutlined :style="{ fontSize: '24px' }" /> -->
                    </div>
                    <div class="content-detail">
                      <div class="file-name">Device Info</div>
                      <div class="device-info">
                        <a-space size="middle" class="wrap">
                          <span class="sub">
                            {{ JSON.parse(currentPhoto?.photo?.exif)?.Make }}
                          </span>
                          <span class="sub">
                            {{ JSON.parse(currentPhoto?.photo?.exif)?.Model }}
                          </span>
                          <span class="sub">
                            {{ JSON.parse(currentPhoto?.photo?.exif)?.FocalLength }}
                          </span>
                          <span class="sub" v-if="JSON.parse(currentPhoto?.photo?.exif)?.Aperture">
                            f/{{ JSON.parse(currentPhoto?.photo?.exif)?.Aperture }}
                          </span>
                          <span
                            class="sub"
                            v-if="JSON.parse(currentPhoto?.photo?.exif)?.ShutterSpeed"
                          >
                            {{ JSON.parse(currentPhoto?.photo?.exif)?.ShutterSpeed }} sec
                          </span>
                          <span class="sub" v-if="JSON.parse(currentPhoto?.photo?.exif)?.ISO">
                            ISO {{ JSON.parse(currentPhoto?.photo?.exif)?.ISO }}
                          </span>
                          <span class="sub">
                            {{ JSON.parse(currentPhoto?.photo?.exif)?.Flash }}
                          </span>
                        </a-space>
                      </div>
                    </div>
                  </div>
                  <div
                    class="content-box"
                    v-if="currentPhoto?.photo?.attributes || currentPhoto?.photo?.categories"
                  >
                    <div class="icon">
                      <IconPhotoExclamation stroke-width="1.25" :size="24" />
                    </div>
                    <div class="content-detail">
                      <div class="file-name">Scene</div>
                      <div class="file-detail">
                        <p>Attributes</p>
                        <a-space size="small" class="wrap">
                          <a-tag
                            v-for="(item, index) in JSON.parse(currentPhoto?.photo?.attributes)"
                            color="blue"
                            >{{ item }}</a-tag
                          >
                        </a-space>
                        <p>Categories</p>
                        <a-space size="small" class="wrap">
                          <a-tag
                            v-for="(item, index) in JSON.parse(currentPhoto?.photo?.categories)"
                            color="green"
                            >{{ item }}</a-tag
                          >
                        </a-space>
                      </div>
                    </div>
                  </div>
                  <div
                    class="map"
                    v-if="
                      currentPhoto.photo.exif &&
                      JSON.parse(currentPhoto?.photo?.exif).GPSLongitude &&
                      JSON.parse(currentPhoto?.photo?.exif).GPSLatitude
                    "
                  >
                    <AppMapBox :height="200" :latLong="getPosition(currentPhoto)" :zoom="16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </Transition>
    </div>
  </a-card>
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
import { debounce } from 'lodash-es'
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
// import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import { formatDate } from '@/utils/common/format'
import 'mapbox-gl/dist/mapbox-gl.css'
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
  props: {
    direction: {
      type: Number,
      default: 0
    },
    currentPhoto: {
      type: Object
      // default() {
      //   return {}
      // }
    },
    totalPhoto: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      mousemove: false,
      info: false,
      slide: '',
      description: '',
      center: { lat: 40.689247, lng: -74.044502 },
      mapCenter: [105.7842749, 21.0268378],
      pos: [105.7842749, 21.0268378],
      defaultDateTime: this.$dayjs('00:00:00', 'HH:mm:ss'),
      visible: false,
      value: [],
      data: [],
      fetching: false,
      id: ''
    }
  },
  computed: {
    transition() {
      if (this.direction === 1) return 'slide'
      else if (this.direction === -1) return 'slideback'
      else return 'fade-transition'
    },
    unixToDateTime() {
      let time = this.currentPhoto?.photo?.modified_date
      if (time) {
        return {
          date: this.$dayjs(time).format('DD-MM-YYYY'),
          weekdaysShort: this.$dayjs(time).format('dddd'),
          time: this.$dayjs(time).format('HH:mm')
        }
      }
      return {}
    }
  },
  methods: {
    formatDate,
    shareFile(id) {
      this.id = id
      this.visible = true
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
        type: 'file',
        user: this.value,
        file_id: this.id
      }
      await this.$store.dispatch('share/share', params)
    },
    deteleFile(id) {
      if (id) {
        this.$emit('detele-file', id)
      }
    },
    likeFile(photo) {
      if (photo.id) {
        this.$emit('like-file', photo)
      }
    },
    removeFile(id, type) {
      if (id) {
        this.$emit('remove-file', id, type)
      }
    },
    getPosition() {
      return [
        parseFloat(this.removeString(JSON.parse(this.currentPhoto.photo.exif).GPSLongitude)),
        parseFloat(this.removeString(JSON.parse(this.currentPhoto.photo.exif).GPSLatitude))
      ]
    },
    removeString(string) {
      return string.replace(/[^\d.-]/g, '')
    },
    // photoUrl() {
    // if (photo)
    //   if (photo.asset_type == "mp4" || photo.asset_type == "mov")
    //     return encodeURI(
    //       this.$basePath + "/assets/video/full/" + photo.path + ".mp4"
    //     );
    //   else return encodeURI(this.$basePath + "/assets/full/" + photo.path);
    // return new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
    // },
    // handleDescription() {
    //   this.description = this.currentPhoto.photo.description
    // },
    mouseMove() {
      if (this.timedFunction) clearInterval(this.timedFunction)
      this.mousemove = true
      let self = this
      this.timedFunction = setInterval(function () {
        self.mousemove = false
      }, 2000)
    },

    left() {
      if (this.currentPhoto.index === 0) return
      this.$emit('left')
    },

    right() {
      if (this.currentPhoto.index === this.totalPhoto - 1) return
      this.$emit('right')
    },

    close() {
      this.$emit('close')
    },

    viewInfo() {
      this.info = !this.info

      if (this.info === true) {
        this.slide = 'fade'
      } else if (this.info === false) {
        this.slide = 'slideback'
      }
    },

    handleFocusout() {
      console.log(this.currentPhoto.photo)
      // Todo Call API save Description
    },

    formatUnix(time) {
      if (time) {
        return this.$dayjs(time).format('DD/MM/YYYY HH:mm:ss')
      }
      return ''
    },

    getFileSize(size) {
      if (size) {
        let sizeMb = size / 1024 / 1024

        return Math.round(sizeMb * 100) / 100
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  position: absolute;

  width: 100%;
  height: 64px;
  z-index: 1099;

  // margin-left: 12px;
  // margin-right: 12px;

  &-wrapper {
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
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
.scroller {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  .info-header {
    padding: 0 16px;
    // margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .infomation {
      font-size: 18px;
    }
  }

  .info-content {
    // padding: 0 12px;
    .content-infomation {
      padding: 0 16px;
    }
    .detail {
      &-header {
        padding: 0 16px;
        font-size: 16px;
      }

      &-content {
        .content-box {
          padding: 12px 16px;
          display: flex;
          // align-items: flex-start;

          .icon {
            width: 40px;
            height: 24px;
            display: flex;
            align-items: center;
          }

          .content-detail {
            flex: 1;
            display: flex;
            // align-items: center;
            flex-direction: column;
            justify-content: center;

            .wrap {
              flex-wrap: wrap;
            }
          }
        }
        .content-box:hover {
          background-color: rgb(241, 243, 244);
        }

        .album-list {
          .album-header {
            padding: 0 16px;
            margin-bottom: 12px;
          }
          .list-detail {
            padding: 12px 16px;

            .detail-info {
              display: flex;
              gap: 12px;
              align-items: flex-start;
              img {
                width: 36px;
                height: 36px;
                object-fit: cover;
                border-radius: 4px;
              }
              .album-name {
                line-height: 1;
                margin-bottom: 4px;
              }
            }
          }
        }
      }
    }
  }
}
.btn-category {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-remove {
  padding: 0 6px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .text {
    margin-left: 12px;
    color: #fff;
    font-weight: 600;
  }
}

.btn-close {
  // width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-category:hover {
  background-color: #333;
}

.btn-remove:hover {
  background-color: #333;
}

.cust-card {
  // padding: 0;
  // overflow: hidden;
  background: #000;

  .info {
    position: relative;
    width: 380px;
    min-height: 100vh;
    background-color: #fff;
    z-index: 1200;
  }
}

:deep(.ant-card-body) {
  padding: 0;
  overflow: hidden;
}

.img-slider {
  overflow: hidden;
  position: relative;
  height: 100vh;
}

.img-slider .img-cont {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.img-display {
  border-style: none;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.category-enter-from {
  transform: translate(100%, 0);
}

.category-enter-to {
  transform: translate(0, 0);
}

.category-enter-active {
  transition: 0.3s;
}

.category-leave-from {
  transform: translate(0, 0);
}

.category-leave-to {
  transform: translate(100%, 0);
}

.category-leave-active {
  transition: 0.3s;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.3s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.slideback-leave-active,
.slideback-enter-active {
  transition: 0.3s;
}
.slideback-enter {
  transform: translate(-100%, 0);
}
.slideback-leave-to {
  transform: translate(100%, 0);
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.textarea {
  display: block;
  width: 100%;
  overflow: hidden;
  resize: none;
  min-height: 24px;
  // line-height: 20px;
  padding: 5px;
}
</style>
