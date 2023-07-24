<template>
  <div class="service">
    <h2 class="service-name">
      {{ $i18n.t(service?.name) }}
      <span class="popular" v-if="service.is_popular">MOST POPULAR</span>
    </h2>
    <div class="price">
      <div class="amount">
        {{ formatPrice(service.price) }}
      </div>
      <div class="detail">/month</div>
    </div>
    <a-divider class="mb-18 mt-0" />
    <div class="access">
      <div class="benefit">
        <IconCheck stroke-width="2" :size="24" color="#e03" />
        <div class="benefit-content">{{ service.size }} GB bộ nhớ</div>
      </div>
      <div class="benefit">
        <IconCheck stroke-width="2" :size="24" color="#e03" />
        <div class="benefit-content">Chia sẻ tối đa {{ service.limit }} người</div>
      </div>
      <div class="benefit">
        <IconCheck stroke-width="2" :size="24" color="#e03" />
        <div class="benefit-content">Hỗ trợ 24/7</div>
      </div>
    </div>
    <!-- {{ service }} -->
    <button class="choose-plan mt-18" @click.prevent="byPlan">Mua</button>
  </div>
</template>

<script>
import { IconCheck } from '@tabler/icons-vue'
import { numberWithCommas } from '@/utils/common/format'
export default {
  components: {
    IconCheck
  },
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
    numberWithCommas,
    formatPrice(price) {
      let discount
      if (this.month === 1) {
        discount = 0
      } else if (this.month === 3) {
        discount = 0.05
      } else if (this.month === 6) {
        discount = 0.1
      } else if (this.month === 12) {
        discount = 0.15
      }
      return this.numberWithCommas(price - price * discount)
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
  transition: box-shadow 0.4s ease 0s, transform 0.4s ease 0s;
  /* border: 1px solid #e3e9f0; */
  border-radius: 16px;
  padding: 24px 12px;
  box-shadow: rgba(0, 44, 155, 0.15) 3px 0px 20px -2px;

  &-name {
    color: #070328;
    // font-family: 'Satoshi Bold';
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

  .access {
    .benefit {
      display: flex;
      align-items: center;
      gap: 18px;
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

.service:hover {
  transform: translateY(-6px);
}
</style>
