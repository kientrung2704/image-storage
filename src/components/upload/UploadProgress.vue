<template>
  <teleport to="#app">
    <transition name="modal-animation">
      <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="modal-inner">
            <div class="modal-header">
              <div class="title">Uploading files</div>
              <div class="close">x</div>
            </div>
            <!-- {{ files }} - -->
            <div class="modal-body">{{ files.length }} Files / {{ getFileSize(totalSize) }} MB</div>
            <!-- <div>
              {{ totalPercentage }}
            </div> -->
            <a-progress :percent="totalPercentage" :show-info="false" />

            <div class="file-detail" v-for="(file, index) in files" :key="index">
              <img class="td-image-thumb" v-if="file.thumb" :src="file.thumb" />
              <div class="file-content">
                <div>{{ getFileSize(file.size) }} MB</div>
                <div class="filename">
                  {{ file.name }}
                </div>
                <a-progress :percent="file.progress" :show-info="false" />
              </div>
            </div>
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
export default {
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
      modalActive: true
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

    totalPercentage() {
      const progress = 0
      const totalProgress = this.files.reduce(
        (accumulator, currentValue) => accumulator + +currentValue.progress,
        progress
      )

      return totalProgress / this.files.length
    }
  },

  methods: {
    changeVisble() {
      this.visiable = true
    },
    close() {
      this.$emit('close')
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

<style lang="scss">
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
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 8px;
    padding: 12px;

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.td-image-thumb {
  max-width: 16px;
  max-height: 16px;
}
</style>
