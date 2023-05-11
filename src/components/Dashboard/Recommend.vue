<template>
  <n-grid :x-gap="24" :y-gap="24" cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item span="1" v-for="(q, index) of 3" :key="index">
      <div class="recommend-lesson">
        <div class="recommend-lesson-left"></div>
        <div class="recommend-lesson-right">
          <div class="lesson-name">Learn InVision</div>
          <div class="lesson-level">
            <div class="lesson-level__name">{{ $i18n.t('lesson.beginner') }}</div>
            <div class="lv-display">
              <div class="lv-display__content active"></div>
              <div class="lv-display__content"></div>
              <div class="lv-display__content"></div>
            </div>
          </div>
          <div class="lesson-total">
            <span class="lesson-total__count">7</span> {{ $i18n.t('lesson.lesson') }}
          </div>
        </div>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  created() {
    $message.success('已发布')
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
