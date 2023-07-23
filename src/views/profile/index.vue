<template>
  <div class="main">
    <!-- <div class="settings-menu">
      <router-link
        class="menu-link"
        :class="{ active: menu.link === currentRoute }"
        v-for="(menu, index) in menus"
        :key="index"
        :to="{ name: menu.link }"
      >
        {{ menu.name }}
      </router-link>
    </div> -->
    <div class="settings-menu">
      <a-segmented v-model:value="currentRoute" :options="options2" @change="handleChange">
        <template #label="{ value }">
          <!-- <div style="padding: 4px 4px">
          <div>{{ payload.title }}</div>
          <div>{{ payload.subTitle }}</div>
        </div> -->

          {{ this.$i18n.t(value) }}
        </template>
      </a-segmented>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          link: 'general',
          name: this.$i18n.t('gerenal')
        },
        {
          link: 'security',
          name: this.$i18n.t('security')
        },
        {
          link: 'plan',
          name: this.$i18n.t('plan')
        },
        {
          link: 'payment-history',
          name: this.$i18n.t('payment-history')
        }
      ],
      options2: [
        {
          value: 'general'
        },
        {
          value: 'security'
        },
        {
          value: 'plan'
        },
        {
          value: 'payment-history'
        }
      ],
      value2: 'general'
    }
  },

  computed: {
    currentRoute() {
      return this.$route.name
    }
  },

  // created() {
  //   this.$root.$refs.loading.start()

  //   setInterval(() => {
  //     this.$root.$refs.loading.finish()
  //   }, 500)
  // },

  methods: {
    handleChange(e) {
      this.$router.push({ name: e })
      console.log(e)
    },
    activeRoute(name) {
      console.log(this.$route.name)
      return this.$route.name === name
    }
  }
}
</script>

<style lang="scss">
.settings-menu {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;

  .active {
    background: #d2dce2;
    color: #1f222a;
  }

  .menu-link {
    cursor: pointer;
    color: #4e4f53;
    border-radius: 6px;
    line-height: 22px;
    min-height: 0;
    padding: 5px 16px;
  }

  .menu-link:hover {
    background-color: #dde0e2;
  }

  .active:hover {
    background-color: #c5cdd3;
  }
}

@media (min-width: 600px) and (max-width: 1439.98px) {
  .settings-menu {
    margin-bottom: 16px;
  }
}

@media (max-width: 599.98px) {
  .settings-menu {
    margin-bottom: 8px;
  }
}
</style>
