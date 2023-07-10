<template>
  <div id="loading-overlay" :style="{ display: show ? 'block' : 'none' }">
    <div class="spinner-container">
      <div class="sk-circle-bounce">
        <div class="sk-child sk-circle-1"></div>
        <div class="sk-child sk-circle-2"></div>
        <div class="sk-child sk-circle-3"></div>
        <div class="sk-child sk-circle-4"></div>
        <div class="sk-child sk-circle-5"></div>
        <div class="sk-child sk-circle-6"></div>
        <div class="sk-child sk-circle-7"></div>
        <div class="sk-child sk-circle-8"></div>
        <div class="sk-child sk-circle-9"></div>
        <div class="sk-child sk-circle-10"></div>
        <div class="sk-child sk-circle-11"></div>
        <div class="sk-child sk-circle-12"></div>
      </div>
      <!-- <div class="lds-default">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    percent: 0,
    show: false,
    canSuccess: true,
    duration: 10000,
    height: '2px',
    color: '#77b6ff',
    failedColor: 'red'
  }),
  methods: {
    start() {
      this.show = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random())
        if (this.percent > 95) {
          this.finish()
        }
      }, 100)
      return this
    },
    set(num) {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
      return this
    },
    get() {
      return Math.floor(this.percent)
    },
    increase(num) {
      this.percent += Math.floor(num)
      // return this;
    },
    decrease(num) {
      this.percent -= Math.floor(num)
      // return this;
    },
    finish() {
      this.percent = 100
      this.hide()
      return this
    },
    pause() {
      clearInterval(this._timer)
      return this
    },
    hide() {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        this.$nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail() {
      this.canSuccess = false
      return this
    }
  }
}
</script>
<style lang="scss"></style>
