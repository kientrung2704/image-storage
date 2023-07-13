<template>
  <a-progress :percent="storagePercentage" size="small" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ lang: 'setting/lang', user: 'user/userInfo' }),
    storagePercentage() {
      return Math.round((this.user.access_limit?.used / this.user.access_limit?.size) * 100)
    }
  }
}
</script>
