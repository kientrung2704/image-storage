<template>
  <div class="payment-history">
    <div class="payment-header">Lịch sử thanh toán</div>
    <a-card :bordered="false" class="search">
      <a-row :gutter="16">
        <a-col class="gutter-row" :xs="20" :sm="22" :md="22" :lg="20" :xl="16" :xxl="12">
          <a-row :gutter="[16, 12]">
            <a-col class="gutter-row" :xs="24" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
              <div class="profile-input relative">
                <label for="email" class="form-label color-dark-gray absolute-label"
                  >Mã đơn hàng</label
                >
                <div class="form-control">
                  <input type="text" id="email" class="form-input" />
                </div>
              </div>
            </a-col>
            <a-col class="gutter-row" :xs="24" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
              <div class="profile-input relative">
                <label for="email" class="form-label color-dark-gray absolute-label"
                  >Mã đơn hàng</label
                >
                <div class="form-control">
                  <input type="text" id="email" class="form-input" />
                </div>
              </div>
            </a-col>
            <a-col class="gutter-row" :xs="24" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
              <div class="profile-input relative">
                <label for="email" class="form-label color-dark-gray absolute-label"
                  >Mã đơn hàng</label
                >
                <div class="form-control">
                  <input type="text" id="email" class="form-input" />
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col class="gutter-row" :xs="4" :sm="2" :md="2" :lg="2" :xl="8" :xxl="12">
          <div class="icon-row">1</div>
        </a-col>
      </a-row>
    </a-card>
    <div class="table-content">
      <a-table
        :columns="columns"
        :data-source="orders.data"
        :pagination="false"
        :loading="loading"
        size="middle"
        rowKey="index"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'id'">
            <router-link class="" :to="{ name: 'order-detail', params: { id: text } }">
              {{ text }}
            </router-link>
          </template>
          <template v-if="column.key === 'created_at'">{{ formatDate(text) }}</template>
          <template v-if="column.key === 'price'">{{ numberWithCommas(text) }} VND</template>
          <template v-if="column.key === 'status'">
            <span v-if="text.response_code === '00'">Thành công</span>
            <span v-if="text.response_code === '24'">Đã hủy</span>
            <span v-if="text.response_code != '24' && text.response_code != '00'">Thất bại</span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="tb-action">
              <span>Thanh toán</span>
              <div class="more">
                <a-popover placement="leftTop">
                  <template #content>
                    <router-link
                      class=""
                      :to="{ name: 'order-detail', params: { id: text.order_id } }"
                    >
                      Xem chi tiết
                    </router-link>
                  </template>
                  <more-outlined :style="{ fontSize: '24px' }" />
                </a-popover>
              </div>
            </div>
          </template>
        </template>
      </a-table>
      <div class="tb-pagination">
        <a-pagination
          v-model:current="current"
          v-model:pageSize="limit"
          :total="total"
          :responsive="true"
          :showLessItems="true"
          :page-size-options="pageSizeOptions"
          show-size-changer
          @showSizeChange="onChange"
          @change="onChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { numberWithCommas, formatDate } from '@/utils/common/format'
import { MoreOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    MoreOutlined
  },
  data() {
    return {
      orders: {},
      pagination: {},
      loading: false,
      columns: [
        {
          title: 'STT',
          dataIndex: 'no',
          sorter: true,
          width: '5%',
          key: 'no'
        },
        {
          title: 'Mã đơn hàng',
          dataIndex: 'id',
          sorter: true,
          width: '15%',
          key: 'id'
        },
        {
          title: 'Ngày tạo',
          dataIndex: 'created_at',
          sorter: true,
          width: '20%',
          key: 'created_at'
        },
        {
          title: 'Giá trị đơn hàng',
          dataIndex: 'price',
          sorter: true,
          width: '20%',
          key: 'price'
        },
        {
          title: 'Trạng thái thanh toán',
          dataIndex: 'payment',
          sorter: true,
          width: '20%',
          key: 'status'
        },
        {
          title: 'Hành động',
          dataIndex: 'payment',
          sorter: false,
          width: '20%',
          key: 'action'
        }
      ],
      total: 10,
      current: 1,
      limit: 10,
      pageSizeOptions: ['1', '5', '10', '20', '50'],
      sort: {}
    }
  },
  // mounted() {
  //   const main = document.getElementsByClassName('main')
  //   main[0].style.backgroundColor = '#fff'
  // },
  created() {
    this.getListOrder()
  },
  methods: {
    numberWithCommas,
    formatDate,
    handleTableChange(pagination, filters, sorter) {
      this.sort.field = sorter.field
      this.sort.order = sorter.order.replace('end', '')
      this.getListOrder()
    },
    async getListOrder() {
      // this.$root.$refs.loading.start()
      this.loading = true
      const payload = {
        limit: this.limit,
        page: this.current,
        sort: this.sort
      }
      const res = await this.$store.dispatch('order/list', payload)
      this.orders = res
      this.total = this.orders.total
      this.loading = false
      // this.$root.$refs.loading.finish()
    },
    generateSerial(index) {
      let temp = '0'
      const value = index + 1
      if (value <= 9) {
        temp += value
        return temp
      }
      return value
    },
    // onShowSizeChange(current, pageSize) {
    //   // console.log(current, pageSize)
    //   this.getListOrder()
    // },
    onChange(current, pageSize) {
      // console.log(current, pageSize)
      this.getListOrder()
    }
  }
  // beforeUnmount() {
  //   const main = document.getElementsByClassName('main')
  //   main[0].style.backgroundColor = '#f2f6f8'
  // }
}
</script>

<style lang="scss" scoped>
.payment-history {
  // background-color: #fff;
  height: 100%;
  .payment-header {
    font-size: 24px;
    margin-bottom: 18px;
  }

  .search {
    margin-bottom: 18px;
    width: 100%;

    .icon-row {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .profile-input {
      margin-bottom: 0 !important;
      .form-control {
        margin-top: 0;
      }
    }

    .relative {
      position: relative;

      .absolute-label {
        position: absolute;
        top: -8px;
        left: 10px;
        background: #fff;
        // font-weight: 600;
        z-index: 1;
        color: #434343;
      }
    }
  }
  .table-content {
    background: #fff;
    height: calc(100% - 42px);
    border-radius: 6px;
    .tb-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;

      .more {
        cursor: pointer;
        height: 48px;
        box-shadow: -1px 0px 0px 0px #d9d9d9;
      }
    }

    .tb-pagination {
      padding: 0 12px;
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
    }
  }
  :deep(.ant-table-cell:last-child) {
    padding: 0 0 0 8px !important;
    height: 48px;
  }

  :deep(.ant-table-cell) {
    padding: 0 8px !important;
    height: 48px;
  }

  :deep(.ant-card-body) {
    padding: 12px;
  }
}
</style>
