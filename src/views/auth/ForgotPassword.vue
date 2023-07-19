<template>
  <div class="forgot_password">
    <div class="container">
      <div class="heading">
        <h1>Quên mật khẩu</h1>
        <p v-if="!isPassEmail">
          Đừng lo lắng, chuyện này vẫn thường xảy ra với bất cứ ai, chúng tôi sẽ gửi cho bạn mã OTP
          để đặt lại mật khẩu của bạn
        </p>
        <p v-else>Tạo một mật khẩu mới</p>
      </div>
      <div class="form-container">
        <div class="form">
          <v-otp-input
            ref="otpInput"
            v-model:value="bindModal"
            input-classes="otp-input"
            separator=""
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="letter-numeric"
            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
            :placeholder="['', '', '', '', '', '']"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
          <div class="profile-input relative mb-18" v-if="!isPassEmail">
            <label for="email" class="form-label color-dark-gray absolute-label"> Email </label>
            <div class="form-control">
              <input
                type="text"
                id="email"
                class="form-input"
                v-model="email"
                :class="{ 'error-border': v$.email.$errors.length > 0 }"
                @blur="handleBlurInput('email')"
              />

              <div class="text-error" v-if="v$.email.$error">
                {{ v$.email.$errors[0].$params.property }}
              </div>
            </div>
          </div>
          <div class="password" v-else>
            <div class="profile-input relative mb-18">
              <label for="password" class="form-label color-dark-gray absolute-label">{{
                $i18n.t('user.password')
              }}</label>
              <div class="form-control">
                <div class="password">
                  <input
                    :type="visible ? 'password' : 'text'"
                    id="password"
                    class="form-input"
                    v-model="password"
                    :class="{ 'error-border': v$.password.$errors.length > 0 }"
                    @blur="handleBlurInput('password')"
                  />
                  <!-- <div class="gen">
                    <span class="btn-gen">Generate</span> -->
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

                  <!-- </div> -->
                </div>

                <div class="text-error" v-if="v$.password.$error">
                  {{ v$.password.$errors[0].$params.property }}
                </div>
              </div>
            </div>
            <div class="profile-input relative mb-18">
              <label for="repeat_password" class="form-label color-dark-gray absolute-label">
                {{ $i18n.t('user.confirm_password') }}
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
                  <!-- <div class="gen">
                    <span class="btn-gen">Generate</span> -->
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

                  <!-- </div> -->
                </div>

                <div class="text-error" v-if="v$.repeat_password.$error">
                  {{ v$.repeat_password.$errors[0].$params.property }}
                </div>
              </div>
            </div>
          </div>
          <div class="btn-group">
            <button class="btn-action back" @click="back">Quay lại</button>
            <button class="btn-action continue" @click="handleSubmit">Tiếp tục</button>
          </div>

          <div class="pass-list mt-36" v-if="isPassEmail">
            <div class="pass-list__text">Mật khẩu là một chuỗi ký tự như sau:</div>
            <div class="pass-list__item mt-24 mb-12">
              <IconCircleCheck color="rgb(67, 133, 244)" stroke-width="2" :size="24" />
              Mật khẩu dài ít nhất 8 ký tự
            </div>
            <div class="pass-list__item my-12">
              <IconCircleCheck color="rgb(67, 133, 244)" stroke-width="2" :size="24" />
              Có ít nhất 1 chữ viết hoa
            </div>
            <div class="pass-list__item my-12">
              <IconCircleCheck color="rgb(67, 133, 244)" stroke-width="2" :size="24" />
              Có ít nhất 1 số (0–9)
            </div>
            <div class="pass-list__item my-12">
              <IconCircleCheck color="rgb(67, 133, 244)" stroke-width="2" :size="24" />
              Có ít nhất 1 ký tự đặc biệt (@ # $% ^ & + =)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import { IconEye } from '@tabler/icons-vue'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import useValidate from '@vuelidate/core'
import { maxLength, required, isNotFormatEmail, isNotFormatPassword } from '@/plugins/vuelidate'
import { helpers, sameAs } from '@vuelidate/validators'
import { IconCircleCheck } from '@tabler/icons-vue'
import VOtpInput from 'vue3-otp-input'
export default {
  components: {
    IconEye,
    EyeOutlined,
    EyeInvisibleOutlined,
    IconCircleCheck,
    VOtpInput
  },
  data() {
    return {
      v$: useValidate({ $autoDirty: true }),
      email: '',
      password: '',
      repeat_password: '',
      visible: true,
      visibleRepeat: true,
      isPassEmail: false,
      bindModal: ''
    }
  },
  validations() {
    if (!this.isPassEmail) {
      return {
        email: {
          required: helpers.withParams(
            { property: this.$i18n.t('validate.email.required') },
            required
          ),
          maxLength: helpers.withParams(
            { property: this.$i18n.t('validate.email.max_length') },
            maxLength(255)
          ),
          isNotFormatEmail: helpers.withParams(
            { property: this.$i18n.t('validate.email.format') },
            isNotFormatEmail
          )
        }
      }
    } else {
      return {
        password: {
          required: helpers.withParams(
            { property: this.$i18n.t('validate.password.required') },
            required
          ),
          maxLength: helpers.withParams(
            { property: this.$i18n.t('validate.password.max_length') },
            maxLength(255)
          ),
          isNotFormatPassword: helpers.withParams(
            { property: this.$i18n.t('validate.password.format') },
            isNotFormatPassword
          )
        },
        repeat_password: {
          required: helpers.withParams(
            { property: this.$i18n.t('validate.confirm_password.required') },
            required
          ),
          sameAsPassword: helpers.withParams(
            { property: this.$i18n.t('validate.confirm_password.same_as') },
            sameAs(this.password)
          )
        }
      }
    }
  },
  watch: {
    isPassEmail() {
      this.v$.$reset()
    }
  },
  methods: {
    handleBlurInput(key) {
      this.v$[key].$touch()
    },
    handleOnComplete() {
      console.log(123)
    },
    handleOnChange() {
      console.log(123123)
    },
    back() {
      if (!this.isPassEmail) {
        this.$router.push({
          name: 'login'
        })
      } else {
        this.isPassEmail = false
      }
    },
    async handleSubmit() {
      if (!this.isPassEmail) {
        const isValidateEmail = await this.v$.$validate()

        if (isValidateEmail) {
          this.$root.$refs.loading.start()
          const params = {
            email: this.email
          }

          this.isPassEmail = true
          // const res = await this.$store.dispatch('auth/login', params)
          // if (res) {
          //   this.$notification[TYPE_ERROR]({
          //     message: this.$i18n.t('message.login.login'),
          //     description: res.error?.response.data.message
          //   })
          // } else {
          //   this.$router.push({ name: 'image' })
          //   this.$notification[TYPE_SUCCESS]({
          //     message: this.$i18n.t('message.login.login'),
          //     description: this.$i18n.t('message.login.success')
          //   })
          // }
          // const resp = await this.$store.dispatch('auth/me')
          // console.log(resp)
          this.$root.$refs.loading.finish()
        }
      } else {
        const isValidate = await this.v$.$validate()
        if (isValidate) {
          this.$root.$refs.loading.start()
          const params = {
            email: this.email,
            password: this.password,
            token: '123'
          }

          this.$root.$refs.loading.finish()
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/pages/forgot_password';
</style>
