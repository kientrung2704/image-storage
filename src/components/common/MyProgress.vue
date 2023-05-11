<template>
  <div class="my-progress">
    <div class="my-progress__header">
      {{ $i18n.t('my_progress') }}
    </div>
    <div class="mt-24">
      <AppProgress
        :percentage="Math.floor(Math.random() * 100)"
        :title="$i18n.t('lesson.completed')"
      />
    </div>
    <div class="mt-15">
      <AppProgress
        :percentage="Math.floor(Math.random() * 100)"
        :title="$i18n.t('lesson.completed_homeword')"
      />
    </div>
    <div class="mt-15">
      <AppProgress
        :percentage="Math.floor(Math.random() * 100)"
        :title="$i18n.t('lesson.courses_finished')"
      />
    </div>
  </div>
</template>

<style lang="scss"></style>
