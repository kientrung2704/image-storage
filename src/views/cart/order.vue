<template>
  <div class="main">
    <div class="title">Thanh toán</div>
    <div class="order">
      <div class="order-title">Thông tin thanh toán</div>
      <a-row
        :gutter="[
          { xs: 8, sm: 16, md: 24 },
          { xs: 8, sm: 16, md: 24 }
        ]"
      >
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" :xxl="8">
          <div class="profile-input relative">
            <label for="first_name" class="form-label color-dark-gray absolute-label">
              Họ và tên
            </label>
            <div class="form-control">
              <input type="text" id="first_name" class="form-input" disabled />
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" :xxl="8">
          <div class="profile-input relative">
            <label for="first_name" class="form-label color-dark-gray absolute-label">
              Số điện thoại
            </label>
            <div class="form-control">
              <input type="text" id="first_name" class="form-input" disabled />
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" :xxl="8">
          <div class="profile-input relative">
            <label for="first_name" class="form-label color-dark-gray absolute-label">
              Email cá nhân
            </label>
            <div class="form-control">
              <input type="text" id="first_name" class="form-input" disabled />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="order bold">
      <div class="order-title">Dịch vụ</div>
    </div>
    <div class="order">
      <div class="order-title">Thông tin đơn hàng</div>
      <div class="flex justify-between align-center mb-12">
        <div>Tạm tính</div>
        <div>{{ numberWithCommas(50000) }} VND</div>
      </div>
      <div class="flex justify-between align-center mb-12">
        <div>Thuế và phụ phí</div>
        <div>{{ numberWithCommas(5000) }} VND</div>
      </div>
      <div class="flex justify-between align-center">
        <div>Thành tiền</div>
        <div class="right">{{ numberWithCommas(55000) }} VND</div>
      </div>
    </div>
    <div class="order">
      <div class="order-title">Phương thức thanh toán</div>
      <div class="flex justify-start align-center">
        <div class="payment-type">
          <a-radio v-model:checked="checked"
            >Thanh toán qua VNPay <img class="img" src="@/assets/images/vnpay.svg" alt=""
          /></a-radio>
        </div>
      </div>
    </div>
    <div class="flex justify-end align-center mt-18">
      <div class="submit">
        <button @click.prevent="submit" class="btn-payment">XÁC NHẬN THANH TOÁN</button>
      </div>
    </div>
  </div>
</template>

<script>
import { numberWithCommas } from '@/utils/common/format'
export default {
  data() {
    return {
      checked: true
    }
  },

  methods: {
    numberWithCommas,
    submit() {
      console.log(123)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/pages/order';
</style>
