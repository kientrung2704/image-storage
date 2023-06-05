<template>
  <a-row
    :gutter="[
      { xs: 8, sm: 16, md: 24 },
      { xs: 8, sm: 16, md: 24 }
    ]"
  >
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card title="Profile">
        <div class="setting">
          <form>
            <div class="avatar">
              <a-avatar
                @click="selectFile"
                :size="72"
                :src="avatar"
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
              <template v-for="error of v$.user.avatar.$errors" :key="error.$uid">
                <div class="text-error">
                  {{ error.$params.property }}
                </div>
              </template>
            </div>

            <div class="profile">
              <div class="profile-input">
                <label for="first_name" class="form-label color-dark-gray">
                  <!-- {{ $i18n.t('user.first_name') }} -->
                  First name
                </label>
                <div class="form-control">
                  <input
                    type="text"
                    id="first_name"
                    class="form-input"
                    v-model="user.first_name"
                    :class="{ 'error-border': v$.user.first_name.$errors.length > 0 }"
                    @blur="handleBlurInput('first_name')"
                  />
                  <template v-for="error of v$.user.first_name.$errors" :key="error.$uid">
                    <div class="text-error">
                      {{ error.$params.property }}
                    </div>
                  </template>
                </div>
              </div>
              <div class="profile-input">
                <label for="last_name" class="form-label color-dark-gray">
                  <!-- {{ $i18n.t('user.first_name') }} -->
                  Last name
                </label>
                <div class="form-control">
                  <input
                    type="text"
                    id="last_name"
                    class="form-input"
                    :class="{ 'error-border': v$.user.last_name.$errors.length > 0 }"
                    v-model="user.last_name"
                    @blur="handleBlurInput('last_name')"
                  />

                  <template v-for="error of v$.user.last_name.$errors" :key="error.$uid">
                    <div class="text-error">
                      {{ error.$params.property }}
                    </div>
                  </template>
                </div>
              </div>
              <div class="profile-input">
                <label for="email" class="form-label color-dark-gray">
                  <!-- {{ $i18n.t('user.first_name') }} -->
                  E-mail address
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
                  <template v-for="error of v$.user.email.$errors" :key="error.$uid">
                    <div class="text-error">
                      {{ error.$params.property }}
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <div class="button-form">
              <a-button @click.prevent="onSubmit" type="primary" size="large">Change Data</a-button>
            </div>
          </form>
        </div>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card title="Account infomation">
        <div class="setting">
          <div class="account-type">
            <div class="text">Account type</div>
            <a-tag color="pink">Free account</a-tag>
          </div>
          <div class="account-type cust-margin">
            <div class="text">Remain</div>
            <div class="text">128 days left</div>
          </div>
          <div class="storage">
            <div class="text">Storage</div>
            <div class="usage">
              <div class="left">
                Used <strong class="cur-usage">0 KB</strong> out of
                <strong class="limit-storage">10 GB</strong>
              </div>
              <div class="right">
                <strong>{{ storagePercentage }}%</strong>
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
                Share <strong class="cur-usage">10</strong> out of
                <strong class="limit-share">10 Peoples</strong>
              </div>
              <div class="right">
                <strong>{{ sharePercentage }}%</strong>
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
            <a-button @click.prevent="onSubmit" type="primary" size="large">Change Data</a-button>
          </div>
        </div>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card title="Card title">
        <p>card content</p>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import { FILE_IMAGE_TYPE, MAX_SIZE_IMAGE } from '@/constants/dbConstant'
import useValidate from '@vuelidate/core'
import { maxLength, required, isNotFormatEmail } from '@/plugins/vuelidate'
import { helpers } from '@vuelidate/validators'
import { h } from 'vue'
import { IconX } from '@tabler/icons-vue'

export default {
  components: {
    IconX
  },
  data() {
    return {
      v$: useValidate({ $autoDirty: true }),
      avatar: 'https://joesch.moe/api/v1/random',
      user: {
        avatar: 'https://joesch.moe/api/v1/random',
        first_name: '',
        last_name: '',
        email: ''
      },
      storagePercentage: 10,
      sharePercentage: 100
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
            { property: this.$i18n.t('message.title.email') },
            isNotFormatEmail
          )
        },
        first_name: {
          required: helpers.withParams(
            { property: this.$i18n.t('message.title.password') },
            required
          ),
          maxLength: helpers.withParams(
            { property: this.$i18n.t('message.title.email') },
            maxLength(255)
          )
        },
        last_name: {
          required: helpers.withParams(
            { property: this.$i18n.t('message.title.password') },
            required
          ),
          maxLength: helpers.withParams(
            { property: this.$i18n.t('message.title.email') },
            maxLength(255)
          )
        },
        avatar: {
          required: helpers.withParams(
            { property: this.$i18n.t('message.title.password') },
            required
          )
        }
      }
    }
  },

  methods: {
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
      this.user.avatar = file
      this.avatar = url
    },

    handleBlurInput(key) {
      this.v$.user[key].$touch()
    },

    async onSubmit() {
      this.$notification[TYPE_ERROR]({
        message: this.$i18n.t('message.update_stamp_image.update'),
        description: this.$i18n.t('message.update_stamp_image.error')
      })
      const isValidate = await this.v$.$validate()
      if (isValidate) {
        const formData = new FormData()

        formData.append('avatar', this.avatar)
        formData.append('first_name', this.user.first_name)
        formData.append('last_name', this.user.last_name)
        formData.append('email', this.user.email)
      }
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
    &-input {
      margin-bottom: 12px;

      .form-label {
        font-size: 12px;
      }
      .form-control {
        margin-top: 6px;

        .form-input {
          width: 100%;
          padding: 6px 12px;
          background: 0 0;
          border: none;
          border-radius: 4px;
          color: #000000de;
          font-weight: 400;
          letter-spacing: 0.00937em;
          line-height: 28px;
          outline: 0;
          text-decoration: inherit;
          text-transform: inherit;
          // background-color: #f2f6f8;
          border: 1px solid #00000026;
          height: 40px;
        }

        .error-border {
          border: 1px solid #c10015;
        }
      }
    }
  }

  .button-form {
    display: flex;
    justify-content: flex-end;

    :deep(.ant-btn) {
      border-radius: 4px;
    }

    :deep(.ant-btn-primary) {
      background-color: #0451f9 !important;
      color: #ffffff !important;
      font-family: 'Sarabun Med';
      border: none;
    }

    :deep(.ant-btn-primary:hover) {
      opacity: 0.8;
    }
  }

  .account-type {
    margin-bottom: 12px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #00000026;

    .text {
      color: #86909a;
    }

    :deep(.ant-tag) {
      margin-right: 0;
    }
  }

  .cust-margin {
    margin-bottom: 52.2px;
  }
  .storage {
    margin-top: 24px;
    margin-bottom: 16px;
    .text {
      font-family: 'Sarabun Med';
      margin-bottom: 8px;
    }

    .usage {
      margin-bottom: 12px;
      font-family: 'Sarabun Med';
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

:deep(.ant-card) {
  height: 100%;
  border-radius: 8px !important;
}

:deep(.ant-card-bordered) {
  border: 1px solid #00000026;
}

:deep(.ant-card-head) {
  border-bottom: 1px solid #00000026;
}

:deep(.ant-card-head-title) {
  font-family: 'Sarabun Med';
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
</style>
