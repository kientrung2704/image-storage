<template>
  <div class="plan">
    <a-card :bordered="false" title="Upgrade account">
      <div class="setting">
        <div class="container">
          <div class="plan-title">
            <h2>Choose your plan</h2>
            <div class="plan-month mb-30">
              <div class="btn-month" :class="{ active: month === 1 }" @click="handleChangeMonth(1)">
                1 month
              </div>
              <div class="btn-month" :class="{ active: month === 3 }" @click="handleChangeMonth(3)">
                <span class="discount">5% OFF</span>
                3 months
              </div>
              <div class="btn-month" :class="{ active: month === 6 }" @click="handleChangeMonth(6)">
                <span class="discount">10% OFF</span>
                6 months
              </div>
              <div
                class="btn-month"
                :class="{ active: month === 12 }"
                @click="handleChangeMonth(12)"
              >
                <span class="discount">15% OFF</span>
                1 year
              </div>
            </div>
          </div>

          <a-row
            :gutter="[
              { xs: 8, sm: 16, md: 24 },
              { xs: 8, sm: 16, md: 24 }
            ]"
          >
            <a-col
              v-for="(service, index) in services"
              :key="index"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
              :xl="8"
              :xxl="6"
            >
              <AppPlan :service="service" :month="month" />
            </a-col>
          </a-row>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import AppPlan from '../../components/AppPlan.vue'

export default {
  components: { AppPlan },
  data() {
    return {
      month: 1,
      services: []
    }
  },

  created() {
    this.getListPackage()
  },

  methods: {
    handleChangeMonth(month) {
      this.month = month
    },
    async getListPackage() {
      this.$root.$refs.loading.start()
      const res = await this.$store.dispatch('package/listPackage')
      this.services = res
      this.$root.$refs.loading.finish()
    }
  }
}
</script>

<style lang="scss" scoped>
.plan {
  .plan-title {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 48px;
      font-weight: 600;
    }
    .plan-month {
      min-width: 300px;
      max-width: 300px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #dde3e8;
      padding: 3px;
      border-radius: 8px;

      .btn-month {
        position: relative;
        flex: 1;
        text-align: center;
        cursor: pointer;
        padding: 4px 0;
        border-radius: 6px;

        .discount {
          top: -10px;
          right: 13%;
          color: #fff;
          line-height: 1;
          font-size: 11px;
          padding: 1px 2px;
          border-radius: 6px;
          width: 55px;
          position: absolute;
          background-color: #f50;
        }
      }

      .btn-month:hover {
        background-color: #dde0e2;
      }

      .active {
        background-color: #fff;
      }

      .active:hover {
        background-color: #fff !important;
      }
    }
  }

  .container {
    max-width: 1430px;
    margin: 0 auto;
  }
}

// Card
:deep(.ant-card) {
  height: 100%;
  // border-radius: 8px !important;
}

// :deep(.ant-card-bordered) {
//   border: 1px solid #00000026 !important;
// }

// :deep(.ant-card-head) {
//   border-bottom: 1px solid #00000026;
// }

:deep(.ant-card-head-title) {
  // font-family: 'Satoshi Med';
  font-weight: 500;
}
</style>
