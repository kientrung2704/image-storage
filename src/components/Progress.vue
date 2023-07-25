<template>
  <a-progress :percent="storagePercentage" size="small" :show-info="false" />
  <span>
    Đã sử dụng {{ kbToSize(user.access_limit?.used) }}/{{ kbToSize(user.access_limit?.size) }}
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ lang: 'setting/lang', user: 'user/userInfo' }),
    storagePercentage() {
      return Math.round((this.user.access_limit?.used / this.user.access_limit?.size) * 100)
    }
  },
  methods: {
    kbToSize(bytes) {
      var sizes = ['KB', 'MB', 'GB', 'TB']
      if (!bytes || bytes == 0) return '0'
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      if (i == 0) return bytes + ' ' + sizes[i]
      return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
    }
  }
}
</script>
