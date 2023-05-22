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
                <a-space size="8">
                  <div class="btn-category">
                    <ShareAltOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                  <div class="btn-category" @click="viewInfo">
                    <InfoCircleOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                  <div class="btn-category">
                    <StarOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                  <div class="btn-category">
                    <DeleteOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                  <div class="btn-category">
                    <MoreOutlined :style="{ color: '#ffffff', fontSize: '20px' }" />
                  </div>
                </a-space>
              </div>
            </div>
          </div>
          <Transition class="img-slider" :name="transition">
            <div :key="currentPhoto?.photo.id" :id="currentPhoto?.photo.id">
              <img class="img-display" :src="currentPhoto?.photo.src" />
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
        <div key="3" class="info-content" v-show="info">
          <!-- <div> -->
          <div class="scroller" v-if="info">{{ slide }}</div>
          <!-- </div> -->
        </div>
      </Transition>
    </div>
  </a-card>
</template>

<script>
import {
  LeftOutlined,
  RightOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  MoreOutlined,
  DeleteOutlined,
  StarOutlined,
  ShareAltOutlined
} from '@ant-design/icons-vue'
export default {
  components: {
    LeftOutlined,
    RightOutlined,
    InfoCircleOutlined,
    ArrowLeftOutlined,
    MoreOutlined,
    DeleteOutlined,
    StarOutlined,
    ShareAltOutlined
  },
  props: {
    direction: {
      type: Number,
      default: 0
    },
    currentPhoto: {
      type: Object,
      default() {
        return {}
      }
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
      slide: ''
    }
  },
  computed: {
    transition() {
      if (this.direction === 1) return 'slide'
      else if (this.direction === -1) return 'slideback'
      else return 'fade-transition'
    }
  },
  methods: {
    // photoUrl() {
    // if (photo)
    //   if (photo.asset_type == "mp4" || photo.asset_type == "mov")
    //     return encodeURI(
    //       this.$basePath + "/assets/video/full/" + photo.path + ".mp4"
    //     );
    //   else return encodeURI(this.$basePath + "/assets/full/" + photo.path);
    // return new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
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
.scroller {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
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

.btn-category:hover {
  background-color: #333;
}

.cust-card {
  // padding: 0;
  // overflow: hidden;
  background: #000;

  .info-content {
    position: relative;
    width: 360px;
    min-height: 100vh;
    background-color: #fff;
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
</style>
