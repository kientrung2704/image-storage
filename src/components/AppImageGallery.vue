<template>
  <a-card :bordered="false" ref="viewer" @mousemove="mouseMove">
    <a-row style="min-height: 100vh">
      <a-col style="position: relative; width: 100%">
        <transition-group tag="div" class="img-slider" :name="transition">
          <div class="img-cont">
            <img class="img-display" :src="photoUrl()" />
            <a-button
              shape="circle"
              size="large"
              style="position: absolute; top: 50%; left: 10px"
              @click="left"
              v-if="mousemove"
            >
              <template #icon><LeftOutlined /></template>
            </a-button>
            <a-button
              shape="circle"
              size="large"
              style="position: absolute; top: 50%; right: 10px"
              @click="right"
              v-if="mousemove"
            >
              <template #icon><RightOutlined /></template>
            </a-button>
          </div>
        </transition-group>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    LeftOutlined,
    RightOutlined
  },
  data() {
    return {
      mousemove: false
    }
  },
  computed: {
    transition() {
      if (this.direction == 1) return 'slide'
      else if (this.direction == -1) return 'slideback'
      else return 'fade-transition'
    }
  },
  methods: {
    photoUrl() {
      // if (photo)
      //   if (photo.asset_type == "mp4" || photo.asset_type == "mov")
      //     return encodeURI(
      //       this.$basePath + "/assets/video/full/" + photo.path + ".mp4"
      //     );
      //   else return encodeURI(this.$basePath + "/assets/full/" + photo.path);
      return new URL(`/src/assets/images/${1}.jpeg`, import.meta.url).href
    },
    mouseMove() {
      if (this.timedFunction) clearInterval(this.timedFunction)
      this.mousemove = true
      let self = this
      this.timedFunction = setInterval(function () {
        self.mousemove = false
      }, 2000)
    },
    left() {
      this.$emit('left')
    },

    right() {
      this.$emit('right')
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.ant-card-body) {
  padding: 0;
  overflow: hidden;
  background: #000;
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
