<template>
  <a-row
    :gutter="[
      { xs: 8, sm: 16, md: 24 },
      { xs: 8, sm: 16, md: 24 }
    ]"
  >
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card :bordered="false" title="Profile">
        <div class="setting">
          <form>
            <div class="avatar">
              <a-avatar
                @click="selectFile"
                :size="72"
                :src="user.avatar"
                :style="{ backgroundColor: '#022ec6', verticalAlign: 'middle', cursor: 'pointer' }"
              >
              </a-avatar>

              <input
                style="display: none"
                type="file"
                ref="file"
                accept="image/jpeg, image/png"
                class="d-none"
                @change="handleUpload"
              />
            </div>

            <div class="profile">
              <div class="profile-input">
                <label for="name" class="form-label color-dark-gray">
                  {{ $i18n.t('user.name') }}
                </label>
                <div class="form-control">
                  <input
                    type="text"
                    id="name"
                    class="form-input"
                    v-model="user.name"
                    :class="{ 'error-border': v$.user.name.$errors.length > 0 }"
                    @blur="handleBlurInput('name')"
                  />
                  <div class="text-error" v-if="v$.user.name.$error">
                    {{ v$.user.name.$errors[0].$params.property }}
                  </div>
                </div>
              </div>
              <div class="profile-input">
                <label for="phone_number" class="form-label color-dark-gray">
                  {{ $i18n.t('user.phone_number') }}
                </label>
                <div class="form-control">
                  <input
                    type="text"
                    id="phone_number"
                    class="form-input"
                    :class="{ 'error-border': v$.user.phone_number.$errors.length > 0 }"
                    v-model="user.phone_number"
                    @blur="handleBlurInput('phone_number')"
                  />
                  <div class="text-error" v-if="v$.user.phone_number.$error">
                    {{ v$.user.phone_number.$errors[0].$params.property }}
                  </div>
                </div>
              </div>
              <div class="profile-input">
                <label for="email" class="form-label color-dark-gray">
                  {{ $i18n.t('user.email') }}
                </label>
                <div class="form-control">
                  <input
                    id="email"
                    type="text"
                    class="form-input"
                    :class="{ 'error-border': v$.user.email.$errors.length > 0 }"
                    v-model="user.email"
                    @blur="handleBlurInput('email')"
                  />
                  <div class="text-error" v-if="v$.user.email.$error">
                    {{ v$.user.email.$errors[0].$params.property }}
                  </div>
                </div>
              </div>
            </div>

            <div class="button-form">
              <a-button @click.prevent="onSubmit" type="primary" size="large"
                >Lưu Thông Tin</a-button
              >
            </div>
          </form>
        </div>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card :bordered="false" title="Account infomation">
        <div class="setting">
          <div class="account-type pt-0">
            <div class="text">Dịch vụ đang sử dụng</div>
            <a-tag color="default">{{ user.access_limit?.package.name }}</a-tag>
          </div>
          <div class="account-type mb-24">
            <div class="text">Ngày hết hạn</div>
            <div class="text">{{ formatDate(user.access_limit?.expired_at) }}</div>
          </div>
          <div class="storage">
            <div class="text">Storage</div>
            <div class="usage">
              <div class="left">
                Used <span class="cur-usage">{{ kbToSize(user.access_limit?.used) }}</span> out of
                <span class="limit-storage">{{ user.access_limit?.size / (1024 * 1024) }} GB</span>
              </div>
              <div class="right">
                <span>{{ storagePercentage }}%</span>
              </div>
            </div>
            <div class="progress">
              <a-progress
                size="small"
                :stroke-color="getColor(storagePercentage, 'storage')"
                :percent="storagePercentage"
                :show-info="false"
              />
            </div>
          </div>
          <div class="storage">
            <div class="text">Share Limit</div>
            <div class="usage">
              <div class="left">
                Shared <span class="cur-usage">{{ user.access_limit?.shared }}</span> out of
                <span class="limit-share">{{ user.access_limit?.package?.limit }} Peoples</span>
              </div>
              <div class="right">
                <span>{{ sharePercentage }}%</span>
              </div>
            </div>
            <div class="progress">
              <a-progress
                size="small"
                :stroke-color="getColor(sharePercentage, 'share')"
                :percent="sharePercentage"
                :show-info="false"
              />
            </div>
          </div>
          <div class="button-form">
            <button class="btn-action continue" v-if="user?.access_limit?.package?.type === 'FREE'">
              Mua dịch vụ
            </button>
            <button class="btn-action back" v-if="user?.access_limit?.package?.type === 'PAY'">
              Thay đổi dịch vụ
            </button>
            <button class="btn-action continue" v-if="user?.access_limit?.package?.type === 'PAY'">
              Gia hạn dịch vụ
            </button>
            <!-- <router-link class="btn-upgrade" :to="{ name: 'plan' }"> Upgrade Account </router-link> -->
          </div>
        </div>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card :bordered="false" title="Language">
        <div class="setting">
          <a-select
            size="large"
            ref="select"
            v-model:value="lang"
            style="width: 100%"
            @change="handleChange"
          >
            <template #suffixIcon><IconChevronDown stroke-width="3" :size="16" /></template>
            <a-select-option value="viVN">
              <div class="select-lang">
                <img src="@/assets/images/vn.svg" class="flag-icon" alt="" srcset="" />
                <div class="flag-select">{{ $i18n.t('vn') }}</div>
              </div>
            </a-select-option>
            <a-select-option value="enUS">
              <div class="select-lang">
                <img src="@/assets/images/us.svg" class="flag-icon" alt="" srcset="" />
                <div class="flag-select">{{ $i18n.t('en') }}</div>
              </div>
            </a-select-option>
          </a-select>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import { FILE_IMAGE_TYPE, MAX_SIZE_IMAGE } from '@/constants/dbConstant'
import useValidate from '@vuelidate/core'
import { maxLength, required, isNotFormatEmail, isNotFormatPhone } from '@/plugins/vuelidate'
import { helpers } from '@vuelidate/validators'
import { IconX, IconChevronDown } from '@tabler/icons-vue'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/common/format'

export default {
  components: {
    IconX,
    IconChevronDown
  },
  data() {
    return {
      v$: useValidate({ $autoDirty: true }),
      avatar: ''
    }
  },

  validations() {
    return {
      user: {
        email: {
          required: helpers.withParams({ property: this.$i18n.t('message.title.email') }, required),
          maxLength: helpers.withParams(
            { property: this.$i18n.t('message.title.email') },
            maxLength(255)
          ),
          isNotFormatEmail: helpers.withParams(
            { property: this.$i18n.t('message.title.email_format') },
            isNotFormatEmail
          )
        },
        name: {
          required: helpers.withParams(
            { property: this.$i18n.t('message.title.password') },
            required
          ),
          maxLength: helpers.withParams(
            { property: this.$i18n.t('message.title.email') },
            maxLength(255)
          )
        },
        phone_number: {
          required: helpers.withParams(
            { property: this.$i18n.t('message.title.password') },
            required
          ),
          maxLength: helpers.withParams(
            { property: this.$i18n.t('message.title.email') },
            maxLength(11)
          ),
          isNotFormatPhone: helpers.withParams(
            { property: this.$i18n.t('message.title.phone') },
            isNotFormatPhone
          )
        }
        // avatar: {
        //   required: helpers.withParams(
        //     { property: this.$i18n.t('message.title.password') },
        //     required
        //   )
        // }
      }
    }
  },
  computed: {
    ...mapGetters({ lang: 'setting/lang', user: 'user/userInfo' }),
    sharePercentage() {
      if (this.user.access_limit?.shared === 0 && this.user.access_limit?.package?.limit === 0) {
        return 100
      } else {
        return Math.round(
          (this.user.access_limit?.shared / this.user.access_limit?.package?.limit) * 100
        )
      }
    },
    storagePercentage() {
      return Math.round((this.user.access_limit?.used / this.user.access_limit?.size) * 100)
    }
  },

  methods: {
    formatDate,
    kbToSize(bytes) {
      var sizes = ['KB', 'MB', 'GB', 'TB']
      if (bytes == 0) return '0'
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      if (i == 0) return bytes + ' ' + sizes[i]
      return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
    },
    getColor(size, type) {
      if (type === 'storage') {
        if (size < 100) {
          return '#94b5ff'
        } else {
          return '#0451F9'
        }
      } else {
        if (size < 100) {
          return '#ff9800'
        } else {
          return '#c10015'
        }
      }
    },

    selectFile() {
      this.$refs.file.click()
    },

    handleUpload(e) {
      const file = e.target.files[0]

      if (file && !FILE_IMAGE_TYPE.includes(file.type)) {
        this.notification('error', 'Error', 'Image file types JPG, JPEG, PNG.')
        return
      }

      if (file && file.size > MAX_SIZE_IMAGE) {
        this.notification('error', 'Error', 'File images 2000 KB or less.')
        return
      }

      const url = window.URL.createObjectURL(file)
      this.user.avatar = url
      this.avatar = file
    },

    handleBlurInput(key) {
      this.v$.user[key].$touch()
    },

    async onSubmit() {
      const isValidate = await this.v$.$validate()
      if (isValidate) {
        this.$root.$refs.loading.start()
        const formData = new FormData()

        if (this.user.avatar.length > 0) {
          formData.append('avatar', this.avatar)
        }

        formData.append('name', this.user.name)
        formData.append('phone_number', this.user.phone_number)
        formData.append('email', this.user.email)
        const res = await this.$store
          .dispatch('user/update', formData)
          .catch(this.$root.$refs.loading.finish())
        if (res.error) {
          this.$notification[TYPE_ERROR]({
            message: this.$i18n.t('message.estate.createError'),
            description: this.$i18n.t('message.estate.createError')
          })
        } else {
          this.$notification[TYPE_SUCCESS]({
            message: this.$i18n.t('message.estate.createSuccess'),
            description: this.$i18n.t('message.estate.createSuccess')
          })
        }
        this.$root.$refs.loading.finish()
      }
    },

    handleChange(e) {
      this.$store.dispatch('setting/changeLanguage', e)
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  // padding: 24px;

  .avatar {
    margin-bottom: 24px;
  }

  .profile {
  }

  .button-form {
    display: flex;
    gap: 12px;
    justify-content: flex-end;

    .btn-action {
      height: 36px;
      min-width: 64px;
      padding: 0 16px;
      width: 49%;
      cursor: pointer;
      border-radius: 6px;
    }

    .back {
      background-color: #f5f5f5;
    }

    .continue {
      background-color: #ee0033;
      color: #ffffff;
    }
    :deep(.ant-btn) {
      border-radius: 6px;
    }

    :deep(.ant-btn-primary) {
      background-color: #0451f9 !important;
      color: #ffffff !important;
      // font-family: 'Satoshi Med';
      border: none;
    }

    :deep(.ant-btn-primary:hover) {
      opacity: 0.8;
    }

    .btn-upgrade:hover {
      background-color: #dde3e8;
      border: 2px solid #c5d1db;
    }
    .btn-upgrade {
      height: 35px;
      border: 2px solid #dde3e8;
      border-radius: 6px;
      align-items: stretch;
      background: #0000;
      cursor: pointer;
      display: inline-flex;
      flex-direction: column;
      font-size: 14px;
      // font-family: 'Satoshi Med';
      height: auto;
      line-height: 1.35;
      outline: 0;
      padding: 6px 16px;
      position: relative;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      width: auto;
    }
  }

  .account-type {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    // border-bottom: 1px solid #00000026;

    .text {
      color: #86909a;
    }

    :deep(.ant-tag) {
      margin-right: 0;
    }
  }
  .storage {
    margin-top: 24px;
    margin-bottom: 16px;
    .text {
      // font-family: 'Satoshi Med';
      margin-bottom: 8px;
    }

    .usage {
      margin-bottom: 12px;
      // font-family: 'Satoshi Med';
      font-size: 12px;
      color: #86909a;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        .cur-usage {
          color: #616161;
        }

        .limit-storage {
          color: #0451f9;
        }

        .limit-share {
          font-weight: 500;
          color: #ff9800;
        }
      }

      .right {
        color: #616161;
        font-size: 14px;
      }
    }
  }
}

.select-lang {
  display: flex;
  align-items: center;
  height: 100%;
}

.flag-icon {
  height: 18px;
  margin-right: 12px;
  // height: 16px;
}

.flag-select {
  font-size: 14px;
  line-height: 18px;
}

:deep(.ant-card) {
  height: 100%;
  // border-radius: 8px !important;
}

// :deep(.ant-card-bordered) {
//   border: 1px solid #00000026;
// }

// :deep(.ant-card-head) {
//   border-bottom: 1px solid #00000026;
// }

:deep(.ant-card-head-title) {
  // font-family: 'Satoshi Med';
  font-weight: 500;
}

:deep(.ant-progress) {
  line-height: 0;

  .ant-progress-bg {
    height: 5px !important;
  }
}

:deep(.progress) {
  line-height: 0;
}

:deep(
    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector
  ) {
  box-shadow: none !important;
}
</style>
