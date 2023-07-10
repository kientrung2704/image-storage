<template>
  <div class="main">
    <div class="payment" v-if="!isEmpty(payment)">
      <div class="payment-status" v-if="isSuccess">
        <img src="@/assets/images/payment_success.svg" alt="" />
        <p class="mt-24 detail">Giao dịch thanh toán thành công!</p>
      </div>
      <div class="payment-status" v-else>
        <img src="@/assets/images/payment_fail.svg" alt="" />
        <p class="mt-24 detail">Giao dịch thanh toán không thành công!</p>
      </div>
      <div class="payment-info my-24">
        <div class="detail">
          <span class="bold">Mã giao dịch:</span>
          <span class="bold-red ml-6">{{ payment.tmn_code }}</span>
        </div>
        <div class="detail mt-6">
          <span class="bold">Mã đơn hàng:</span>
          <span class="bold-red ml-6">{{ payment.order_id }}</span>
        </div>
      </div>
      <router-link
        class="btn-order-info"
        :to="{ name: 'detail', params: { id: payment.order_id } }"
      >
        XEM TRẠNG THÁI ĐƠN HÀNG
      </router-link>
    </div>
  </div>
</template>

<script>
import { isEmpty } from '@/utils/common/is'
export default {
  data() {
    return {
      payment: {}
    }
  },
  computed: {
    isSuccess() {
      return this.payment.transaction_code === '00'
    }
  },
  async created() {
    await this.getDetail()
  },
  methods: {
    isEmpty,
    async getDetail() {
      this.$root.$refs.loading.start()
      const res = await this.$store.dispatch('payment/getDetail', this.$route.query.order_id)
      this.payment = res
      this.$root.$refs.loading.finish()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/pages/payment';
</style>
