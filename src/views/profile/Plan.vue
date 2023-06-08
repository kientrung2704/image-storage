<template>
  <div class="plan">
    <a-card title="Upgrade account">
      <template #extra>
        <div class="plan-month">
          <div class="btn-month" :class="{ active: month === 1 }" @click="handleChangeMonth(1)">
            1 month
          </div>
          <div class="btn-month" :class="{ active: month === 3 }" @click="handleChangeMonth(3)">
            <span class="discount">5% OFF</span>
            3 months
          </div>
          <div class="btn-month" :class="{ active: month === 6 }" @click="handleChangeMonth(6)">
            <span class="discount">5% OFF</span>
            6 months
          </div>
          <div class="btn-month" :class="{ active: month === 12 }" @click="handleChangeMonth(12)">
            <span class="discount">5% OFF</span>
            1 year
          </div>
        </div>
      </template>
      <div class="setting">
        <a-row
          :gutter="[
            { xs: 8, sm: 16, md: 24 },
            { xs: 8, sm: 16, md: 24 }
          ]"
        >
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" :xxl="6"> 1 </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" :xxl="6"> 1 </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" :xxl="6"> 1 </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" :xxl="6"> 1 </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: 1
    }
  },

  methods: {
    handleChangeMonth(month) {
      this.month = month
    }
  }
}
</script>

<style lang="scss" scoped>
.plan {
  &-month {
    min-width: 350px;
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
        right: 25%;
        color: #fff;
        line-height: 1;
        font-size: 11px;
        padding: 1px 2px;
        border-radius: 4px;
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
      background-color: #c5cdd3;
    }
  }
}

// Card
:deep(.ant-card) {
  height: 100%;
  border-radius: 8px !important;
}

:deep(.ant-card-bordered) {
  border: 1px solid #00000026 !important;
}

:deep(.ant-card-head) {
  border-bottom: 1px solid #00000026;
}

:deep(.ant-card-head-title) {
  font-family: 'Sarabun Med';
  font-weight: 500;
}
</style>
