<template>
  <div class="main">
    <div class="content">
      <div></div>
      <n-switch v-model:value="active" />
      <n-dropdown trigger="hover" :options="languages" @select="handleSetLanguage">
        <n-button>Go For a Trip</n-button>
      </n-dropdown>
      <div>
        <n-button class="cus-btn" type="primary">Register Now</n-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      active: false,
      languages: [
        {
          label: 'Tiếng Việt',
          key: 'viVN'
        },
        {
          label: 'English',
          key: 'enUS'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ lang: 'setting/lang' })
  },
  created() {
    let objIndex = this.languages.findIndex((obj) => obj.key === this.lang)
    this.languages[objIndex].disabled = true
  },
  methods: {
    handleSetLanguage(lang) {
      let local = lang.charAt(0).toUpperCase() + lang.slice(1)
      this.$store.dispatch('setting/changeLanguage', lang)
      this.$store.dispatch('setting/changeLocal', 'date' + local)
      location.reload()
    }
  }
}
</script>

<style lang="scss">
.content {
  flex: 1 1 0%;
}
</style>
