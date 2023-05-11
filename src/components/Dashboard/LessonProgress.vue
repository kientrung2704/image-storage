<template>
  <div class="lesson-progress">
    <div class="ls-top">
      <div class="left"></div>
      <div class="right">
        <div class="lesson-name">Learn InVision</div>
        <div class="lesson-date mt-6">
          <!-- <div class="lesson-date__image"> -->
          <iconTime />
          <!-- </div> -->
          <span class="time">{{ $i18n.t('start') }}: </span>
          <span class="time">04.10.2023</span>
        </div>
        <div class="lesson-lecturer mt-12">
          <n-avatar
            round
            size="tiny"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-avatar
            round
            size="tiny"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-avatar
            round
            size="tiny"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </div>
      </div>
    </div>
    <div class="ls-bottom">
      <div class="lesson-progress-complete mt-12">
        <AppProgress
          :percentage="Math.floor(Math.random() * 100)"
          :title="$i18n.t('lesson.completed')"
        />
      </div>
      <div class="lesson-progress-homeword mt-12">
        <AppProgress
          :percentage="Math.floor(Math.random() * 100)"
          :title="$i18n.t('lesson.completed_homeword')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
