<template>
  <a-row
    :gutter="[
      { xs: 8, sm: 16, md: 24 },
      { xs: 8, sm: 16, md: 24 }
    ]"
  >
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card :bordered="false" title="Change password">
        <div class="setting">
          <form>
            <div class="profile-input">
              <label for="current_password" class="form-label color-dark-gray">
                <!-- {{ $i18n.t('user.first_name') }} -->
                Current Password
              </label>
              <div class="form-control">
                <input
                  type="password"
                  id="current_password"
                  class="form-input"
                  v-model="current_password"
                  :class="{ 'error-border': v$.current_password.$errors.length > 0 }"
                  @blur="handleBlurInput('current_password')"
                />
                <div class="text-error" v-if="v$.current_password.$error">
                  {{ v$.current_password.$errors[0].$params.property }}
                </div>
              </div>
            </div>
            <div class="profile-input">
              <label for="new_password" class="form-label color-dark-gray"> New Password </label>
              <div class="form-control">
                <div class="password">
                  <input
                    :type="visible ? 'password' : 'text'"
                    id="new_password"
                    class="form-input"
                    v-model="new_password"
                    :class="{ 'error-border': v$.new_password.$errors.length > 0 }"
                    @blur="handleBlurInput('new_password')"
                  />
                  <EyeInvisibleOutlined
                    @click="visible = !visible"
                    v-if="visible"
                    :style="{
                      fontSize: '20px',
                      cursor: 'pointer',
                      right: '12px',
                      top: '0',
                      position: 'absolute'
                    }"
                  />
                  <EyeOutlined
                    @click="visible = !visible"
                    v-else
                    :style="{
                      fontSize: '20px',
                      cursor: 'pointer',
                      right: '12px',
                      top: '0',
                      position: 'absolute'
                    }"
                  />
                </div>

                <div class="text-error" v-if="v$.new_password.$error">
                  {{ v$.new_password.$errors[0].$params.property }}
                </div>
              </div>
            </div>
            <div class="profile-input">
              <label for="new_password" class="form-label color-dark-gray">
                <!-- {{ $i18n.t('user.first_name') }} -->
                Confirm Password
              </label>
              <div class="form-control">
                <div class="password">
                  <input
                    :type="visibleRepeat ? 'password' : 'text'"
                    id="repeat_password"
                    class="form-input"
                    v-model="repeat_password"
                    :class="{ 'error-border': v$.repeat_password.$errors.length > 0 }"
                    @blur="handleBlurInput('repeat_password')"
                  />
                  <EyeInvisibleOutlined
                    @click="visibleRepeat = !visibleRepeat"
                    v-if="visibleRepeat"
                    :style="{
                      fontSize: '20px',
                      cursor: 'pointer',
                      right: '12px',
                      top: '0',
                      position: 'absolute'
                    }"
                  />
                  <EyeOutlined
                    @click="visibleRepeat = !visibleRepeat"
                    v-else
                    :style="{
                      fontSize: '20px',
                      cursor: 'pointer',
                      right: '12px',
                      top: '0',
                      position: 'absolute'
                    }"
                  />
                </div>
                <div class="text-error" v-if="v$.repeat_password.$error">
                  {{ v$.repeat_password.$errors[0].$params.property }}
                </div>
              </div>
            </div>
            <div class="button-form">
              <a-button @click.prevent="onSubmit" type="primary"> Change Password </a-button>
            </div>
          </form>
        </div>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card bordered="false" title="Two-factor authentication">
        <div class="setting">
          <img src="@/assets/images/two-factor.svg" alt="" />
          <p class="my-18">
            Turn on two-factor authentication to increase your account's security. You will use both
            your password and security code sent to your email to log in.
          </p>
          <!-- <div class="two-factor">
            <div class="btn-two_factor" :class="{ active: isEnabled }" @click="handleTwoFactor">
              Enabled
            </div>
            <div class="btn-two_factor" :class="{ active: !isEnabled }" @click="handleTwoFactor">
              Disabled
            </div>
          </div> -->
          <a-segmented v-model:value="value" :options="options" size="large" />
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { IconEye } from '@tabler/icons-vue'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import useValidate from '@vuelidate/core'
import { required, isNotFormatPassword, notSamePassword, maxLength } from '@/plugins/vuelidate'
import { helpers, sameAs } from '@vuelidate/validators'
export default {
  components: {
    IconEye,
    EyeOutlined,
    EyeInvisibleOutlined
  },
  data() {
    return {
      v$: useValidate({ $autoDirty: true }),
      current_password: '',
      new_password: '',
      repeat_password: '',
      visible: true,
      visibleRepeat: true,
      isEnabled: false,
      value: 'Enabled',
      options: ['Enabled', 'Disabled']
    }
  },

  validations() {
    return {
      current_password: {
        required: helpers.withParams(
          { property: this.$i18n.t('validate.password.required') },
          required
        ),
        isNotFormatPassword: helpers.withParams(
          { property: this.$i18n.t('validate.password.format') },
          isNotFormatPassword
        )
      },
      new_password: {
        required: helpers.withParams(
          { property: this.$i18n.t('validate.password.required') },
          required
        ),
        isNotFormatPassword: helpers.withParams(
          { property: this.$i18n.t('validate.password.format') },
          isNotFormatPassword
        ),
        maxLength: helpers.withParams(
          { property: this.$i18n.t('validate.password.max_length') },
          maxLength(255)
        )
      },
      repeat_password: {
        required: helpers.withParams(
          { property: this.$i18n.t('validate.confirm_password.required') },
          required
        ),
        sameAsPassword: helpers.withParams(
          { property: this.$i18n.t('validate.confirm_password.same_as') },
          sameAs(this.new_password)
        )
      }
    }
  },

  created() {
    this.$root.$refs.loading.start()
    setTimeout(() => {
      this.$root.$refs.loading.finish()
    }, 500)
  },

  methods: {
    handleBlurInput(key) {
      this.v$[key].$touch()
    },

    handleTwoFactor() {
      this.isEnabled = !this.isEnabled

      // To do
    }
  }
}
</script>

<style lang="scss" scoped>
.password {
  position: relative;
  // border: 1px solid rgba(0, 0, 0, 0.1490196078);
  // display: flex;
  // height: 40px;
  // border-radius: 6px;
  // padding-right: 12px;

  // .form-input {
  //   border: none !important;
  // }

  .gen {
    display: flex;
    align-items: center;
    height: 40px;

    .btn-gen {
      cursor: pointer;
      margin-right: 6px;
    }
  }
}
.button-form {
  display: flex;
  justify-content: flex-end;

  // :deep(.ant-btn) {
  //   border-radius: 6px;
  // }

  :deep(.ant-btn-primary) {
    background-color: #0451f9 !important;
    color: #ffffff !important;
    // font-family: 'Satoshi Med';
    border: none;
  }

  :deep(.ant-btn-primary:hover) {
    opacity: 0.8;
  }
}

.two-factor {
  width: 180px;
  display: flex;
  align-items: center;
  background-color: #dde3e8;
  padding: 3px;
  border-radius: 8px;

  .btn-two_factor {
    flex: 1;
    text-align: center;
    cursor: pointer;
    padding: 4px 0;
    border-radius: 6px;
  }

  .btn-two_factor:hover {
    background-color: #dde0e2;
  }

  .active {
    background-color: #fff;
  }

  .active:hover {
    background-color: #c5cdd3;
  }
}

// Card
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
</style>
