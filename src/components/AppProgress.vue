<template>
  <n-progress
    type="line"
    status="error"
    :percentage="percentage"
    :height="5"
    :color="color"
    class="a-progress"
    border-radius="2"
    fill-border-radius="2"
  >
    <!-- <div class="a-progress_top"> -->
    <span>{{ title }}</span>
    <span>{{ percentage }}%</span>

    <!-- </div> -->
  </n-progress>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },

  computed: {
    color() {
      if (this.percentage < 50) {
        return '#FF8181'
      } else if (this.percentage >= 50 && this.percentage < 90) {
        return '#FFA149'
      } else {
        return '#7DC579'
      }
    }
  }
}
</script>

<style lang="scss">
.n-progress-content {
  flex-direction: column-reverse;

  .n-progress-graph {
    width: 100%;
  }

  div {
    width: 100%;
  }

  .n-progress-custom-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 0 !important;

    span {
      font-size: 13px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 4px;
    }
  }
}
</style>
