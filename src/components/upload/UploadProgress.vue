<template>
  <teleport to="#app">
    <transition name="modal-animation">
      <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="modal-inner">
            <div class="modal-header mb-18">
              <div class="title">Uploading files</div>
              <div class="header-right">
                <div class="total-percentage">{{ totalPercentage }}%</div>
                <div
                  class="close"
                  v-if="totalPercentage === 100 && activeKey === ''"
                  @click="close"
                >
                  <IconX stroke-width="3" :size="16" />
                </div>
                <div class="close" v-else @click="collapse">
                  <IconChevronDown stroke-width="3" :size="16" />
                </div>
              </div>
            </div>

            <div class="file-group">
              <span class="file-total"> {{ files.length }} Files </span> /
              {{ getFileSize(currentUploadSize) }} MB of {{ getFileSize(totalSize) }} MB /
              {{ getFileSize(currentUploadSize) === getFileSize(totalSize) ? 'done' : '' }}
            </div>

            <!-- <div>
              {{ totalPercentage }}
            </div> -->
            <div>
              <a-progress
                size="small"
                :stroke-color="getColor(totalPercentage)"
                :percent="totalPercentage"
                :show-info="false"
              />
            </div>
            <!-- {{ files }} - -->
            <a-collapse v-model:activeKey="activeKey" ghost>
              <a-collapse-panel key="1" header="" :show-arrow="false">
                <div class="modal-body mt-18">
                  <div class="file-detail" v-for="(file, index) in files" :key="index">
                    <img class="image-thumb" v-if="file.thumb" :src="file.thumb" />
                    <div class="file-content">
                      <!-- <div> -->
                      <span class="file-name">{{ file.name }}</span>
                      <!-- </div> -->
                      <div class="file-size">{{ getFileSize(file.size) }} MB</div>

                      <a-progress size="small" :percent="file.percent" :show-info="false" />
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
  <!-- <div>
    <div v-for="(file, index) in files" :key="index">
      <div class="filename">
        {{ file.name }}
      </div>
      <div class="progress" v-if="file.active || file.progress !== '0.00'">
        <div
          :class="{
            'progress-bar': true,
            'progress-bar-striped': true,
            'bg-danger': file.error,
            'progress-bar-animated': file.active
          }"
          role="progressbar"
          :style="{ width: file.progress + '%' }"
        >
          {{ file.progress }}%
        </div>
      </div>

      <td v-if="file.error">{{ file.error }}</td>
      <td v-else-if="file.success">success</td>
      <td v-else-if="file.active">active</td>
    </div>
  </div> -->
</template>

<script>
import { IconX, IconChevronDown } from '@tabler/icons-vue'
export default {
  components: {
    IconX,
    IconChevronDown
  },
  props: {
    files: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      visiable: false,
      modalActive: false,
      activeKey: 1
    }
  },

  computed: {
    totalSize() {
      const size = 0
      const total = this.files.reduce(
        (accumulator, currentValue) => accumulator + currentValue.size,
        size
      )

      return total
    },

    currentUploadSize() {
      const size = 0
      const total = this.files.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue.size * +currentValue.percent) / 100,
        size
      )

      return total
    },

    totalPercentage() {
      const progress = 0
      const totalProgress = this.files.reduce(
        (accumulator, currentValue) => accumulator + +currentValue.percent,
        progress
      )

      return totalProgress / this.files.length
    }
  },

  watch: {
    totalPercentage(newValue) {
      if (newValue === 100) {
        // this.activeKey = ''
      }
    }
  },

  methods: {
    changeVisble() {
      this.activeKey = 1
      this.modalActive = true
    },

    close() {
      this.modalActive = false
      this.activeKey = 1
      this.$emit('close')
    },
    collapse() {
      if (this.activeKey === 1) {
        this.activeKey = ''
      } else {
        this.activeKey = 1
      }
    },
    getFileSize(size) {
      if (size) {
        let sizeMb = size / 1024 / 1024

        return Math.round(sizeMb * 100) / 100
      }
      return ''
    },

    getColor(size) {
      if (size < 100) {
        return '#0451F9'
      } else {
        return '#65CB69'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 100vh;
  // width: 100vw;
  // position: fixed;
  position: absolute;
  bottom: 10px;
  right: 10px;
  max-width: 540px;
  min-width: 340px;
  width: 100%;

  &-inner {
    background: #ffffff;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 12px;

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 16px;
        font-weight: 600;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
        .close {
          background-color: #e8eef2;
          border-radius: 50%;
          // padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
    }

    .modal-body {
      .file-group {
        .file-total {
          font-family: 'Satoshi Med';
          font-size: 14px;
        }
      }
      .file-detail {
        display: flex;
        gap: 12px;
        border: 1px solid #e6ebef;
        align-items: center;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 8px;

        .image-thumb {
          width: 36px;
          height: 36px;
          border-radius: 5px;
          object-fit: cover;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }

        .file-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 40px;

          .file-name {
            font-family: 'Satoshi Med';
            font-size: 14px;
            // font-weight: 600;
            line-height: 1.25;
          }

          .file-size {
            font-size: 12px;
            color: #939ca4;
            font-weight: 600;
          }
        }
      }

      .file-detail {
        margin-bottom: 0;
      }
    }
  }
}

:deep(.ant-progress) {
  line-height: 0;

  .ant-progress-bg {
    height: 5px !important;
  }
}

:deep(.ant-collapse-header) {
  display: none !important;
}

:deep(.ant-collapse-content-box) {
  padding: 0 !important;
}
</style>
