<template>
  <div class="drop" :class="{ 'active-drop': active }">
    <div class="drop-zone">
      <div class="box">
        <div class="inside-box">
          <div class="image"></div>
          <input
            ref="input"
            type="file"
            @change="inputOnChange"
            :webkitdirectory="true"
            :allowdirs="true"
            :directory="true"
            :multiple="true"
          />
          <p><strong>Drag & drop</strong> files anywhere</p>
          <p>to upload them</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true
    }
  },
  methods: {
    toggleActive() {
      this.active = !this.active
    }
  }
}
</script>

<style lang="scss" scoped>
.drop {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 9999;
  top: 0;
  pointer-events: none;
}
.active-drop {
  display: none;
}
.drop-zone {
  top: 0;
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 100%;
  // width: 100vw;
  // height: 100vh;
  // z-index: 9999;
  // position: absolute;
  background-color: #f3f6f9;
  opacity: 0.5;

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 560px;
    min-width: 240px;
    height: 300px;
    padding: 16px;
    border-radius: 5px;
    background-color: #ffffff;

    .inside-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      border: 3px dashed #f3f6f9;
      text-align: center;

      .file {
        display: none;
      }
    }
  }
}
</style>
