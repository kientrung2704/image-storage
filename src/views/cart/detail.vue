<template>
  <div class="main">
    <div class="title">THÔNG BÁO</div>
    <div class="create_date">Ngày tạo đơn hàng: {{ formatDateTime(order.created_at) }}</div>
    <a-row :gutter="[24, 12]" class="mb-30">
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :xxl="8">
        <div class="order-info">
          <div class="info-header">
            <label class="header-title">THÔNG TIN KHÁCH HÀNG</label>
            <div class="label-dot"></div>
          </div>
          <div class="info-detail user">
            <div class="avatar">
              <a-avatar
                class="test"
                :size="88"
                :src="user.avatar"
                :style="{ backgroundColor: '#022ec6', verticalAlign: 'middle', cursor: 'pointer' }"
              >
                {{ user.firt_name }}
              </a-avatar>
            </div>
            <div class="user-info">
              <div class="user-info_detail mb-6">
                <IconUser stroke-width="2" :size="20" color="#86909A" />
                <span class="ml-6">{{ user.name }}</span>
              </div>
              <div class="user-info_detail mb-6">
                <IconPhone stroke-width="2" :size="20" color="#86909A" />
                <span class="ml-6">{{ user.phone_number }}</span>
              </div>
              <div class="user-info_detail mb-6">
                <IconMail stroke-width="2" :size="20" color="#86909A" />
                <span class="ml-6">{{ user.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :xxl="8">
        <div class="order-info">
          <div class="info-header">
            <label class="header-title">TRẠNG THÁI DỊCH VỤ</label>
            <div class="label-dot"></div>
          </div>
          <div class="info-detail">
            <p>
              Trạng thái thanh toán: <span v-if="isSuccess">Thành công</span>
              <span v-else>Thất bại</span>
            </p>
            <p class="mb-0">
              Trạng thái cung cấp dịch vụ: <span v-if="isSuccess">Thành công</span>
              <span v-else>Thất bại</span>
            </p>
          </div>
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :xxl="8">
        <div class="order-info">
          <div class="info-header">
            <label class="header-title">MÃ DỊCH VỤ</label>
            <div class="label-dot"></div>
          </div>
          <div class="info-detail">
            <p>
              Mã đơn hàng: <span>{{ order.id }}</span>
            </p>
            <p v-if="isSuccess">
              Trạng thái thanh toán: <span>{{ order.payment.bank_tran_no }}</span>
            </p>
            <p v-if="isSuccess" class="mb-0">Hình thức giao dịch: <span>VNPAY</span></p>
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="service">
      <div class="info-header">
        <label class="header-title">DANH MỤC DỊCH VỤ</label>
        <div class="label-dot"></div>
      </div>
      <div class="tb-service mb-24">
        <a-table
          :columns="columns"
          :data-source="[order]"
          :pagination="false"
          :loading="loading"
          size="middle"
          rowKey="index"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'package'">{{ text ? text.name : '' }}</template>
            <template v-if="column.key === 'month'">{{ text }} tháng</template>
            <template v-if="column.key === 'price'">{{
              text ? numberWithCommas(text) : ''
            }}</template>
            <template v-if="column.key === 'start'">{{ formatDate(text) }}</template>
            <template v-if="column.key === 'end'">{{ formatDate(text) }}</template>
          </template>
        </a-table>
      </div>
      <div class="order">
        <div class="flex justify-between align-center mb-12">
          <div>Tạm tính</div>
          <div>{{ numberWithCommas(price) }} VND</div>
        </div>
        <div class="flex justify-between align-center mb-12">
          <div>Thuế và phụ phí</div>
          <div>{{ numberWithCommas(tax) }} VND</div>
        </div>
        <div class="flex justify-between align-center">
          <div>Thành tiền</div>
          <div class="right">{{ numberWithCommas(total) }} VND</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTime, numberWithCommas, formatDate } from '@/utils/common/format'
import { mapGetters } from 'vuex'
import { IconPhone, IconUser, IconMail } from '@tabler/icons-vue'

export default {
  components: {
    IconPhone,
    IconUser,
    IconMail
  },
  data() {
    return {
      order: {},
      columns: [
        {
          title: 'Tên gói',
          dataIndex: 'package',
          sorter: false,
          width: '15%',
          key: 'package'
        },
        {
          title: 'Thời hạn',
          dataIndex: 'month',
          sorter: false,
          width: '20%',
          key: 'month'
        },
        {
          title: 'Giá tiền (VND)',
          dataIndex: 'price',
          sorter: false,
          width: '20%',
          key: 'price'
        },
        {
          title: 'Ngày bắt đầu sử dụng',
          dataIndex: 'created_at',
          sorter: false,
          width: '20%',
          key: 'start'
        },
        {
          title: 'Ngày hết hạn dịch vụ',
          dataIndex: 'expired_at',
          sorter: false,
          width: '20%',
          key: 'end'
        }
      ]
    }
  },
  created() {
    this.getDetail()
  },
  computed: {
    ...mapGetters({ user: 'user/userInfo' }),
    isSuccess() {
      return this.order?.payment?.transaction_code === '00'
    },
    price() {
      return this.order?.month * this.order?.package?.price
    },
    tax() {
      return this.order?.month * this.order?.package?.price * 0.1
    },
    total() {
      return (
        this.order?.month * this.order?.package?.price +
        this.order?.month * this.order?.package?.price * 0.1
      )
    }
  },
  methods: {
    formatDateTime,
    numberWithCommas,
    formatDate,
    async getDetail() {
      this.$root.$refs.loading.start()
      const res = await this.$store.dispatch('order/detail', this.$route.params.id)
      this.order = res
      this.$root.$refs.loading.finish()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/pages/order_detail';
</style>
