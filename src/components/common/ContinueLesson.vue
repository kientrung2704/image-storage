<template>
  <div class="continue-lesson">
    <div class="continue-lesson__header">
      {{ $i18n.t('continue_lesson') }}
    </div>
    <div class="content mt-24">
      <div
        class="content-lesson p-18 flex align-center justify-between"
        @mouseover="changeActive(index)"
        @mouseleave="changeActive(0)"
        v-for="(q, index) of 3"
        :key="index"
        :class="{ hover: active === index }"
      >
        <div class="continue-wrapper">
          <div class="course-name">HTML. The Basics</div>
          <div class="lesson-name mt-12">Lesson 12. Table</div>
          <div class="time-watch mt-12">
            <span class="time">16:43</span> <span class="divide"> / </span>
            <span class="time">16:43</span>
          </div>
        </div>
        <div class="icon">
          <iconArrowRightHover v-if="active === index" />
          <iconArrowRight v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  methods: {
    changeActive(index) {
      this.active = index
    }
  }
}
</script>
