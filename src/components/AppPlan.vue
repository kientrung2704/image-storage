<template>
  <div class="service">
    <h2 class="service-name">
      {{ $i18n.t(service?.name) }}
      <span class="popular" v-if="service.isPopular">MOST POPULAR</span>
    </h2>
    <div class="price">
      <div class="amount">
        {{ formatPrice(service.price) }}
      </div>
      <div class="detail">/month</div>
    </div>
    <button class="choose-plan" @click.prevent="byPlan">Mua</button>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      default: {}
    },
    month: {
      type: Number,
      default: 1
    }
  },

  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatPrice(price) {
      return this.numberWithCommas(price)
    },
    byPlan() {
      this.$router.push({
        name: 'order',
        query: { id: this.service.id, month: this.month }
      })
      console.log(this.service.id, this.month)
    }
  }
}
</script>

<style lang="scss" scoped>
.service {
  border: 1px solid #e3e9f0;
  border-radius: 16px;
  padding: 24px 12px;

  &-name {
    color: #070328;
    font-family: 'Satoshi Bold';
    line-height: 1;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    font-size: 32px;
    margin-bottom: 0;

    .popular {
      margin-left: 12px;
      background-color: #f50;
      font-weight: 500;
      border-radius: 20px;
      padding: 4px 8px;
      color: #fff;
      font-size: 12px;
      display: inline-flex;
    }
  }

  .price {
    color: #070328;
    display: flex;
    align-items: flex-end;
    // font-weight: 600;
    margin-top: 18px;
    margin-bottom: 18px;

    .amount {
      line-height: 1;
      font-size: 24px;
      // letter-spacing: 1px;
      margin-right: 6px;
    }

    .detail {
      line-height: 1.25;
    }
  }

  .choose-plan {
    cursor: pointer;
    display: block;
    padding: 12px 0;
    width: 100%;
    background-color: #e03;
    color: #ffffff;
    font-weight: 600;
    border-radius: 6px;
  }
}
</style>
