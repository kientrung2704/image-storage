<template>
  <div class="forgot_password">
    <div class="container">
      <div class="heading">
        <h1>Quên mật khẩu</h1>
        <p>
          Đừng lo lắng, chuyện này vẫn thường xảy ra với bất cứ ai, chúng tôi sẽ gửi cho bạn mã OTP
          để đặt lại mật khẩu của bạn
        </p>
      </div>
      <div class="form-container">
        <div class="form">
          <div class="profile-input relative mb-18">
            <label for="email" class="form-label color-dark-gray absolute-label"> Email </label>
            <div class="form-control">
              <input
                type="text"
                id="email"
                class="form-input"
                v-model="email"
                :clas="{ 'error-border': v$.email.$errors.length > 0 }"
                @blur="handleBlurInput('email')"
              />

              <div class="text-error" v-if="v$.email.$error">
                {{ v$.email.$errors[0].$params.property }}
              </div>
            </div>
          </div>
          <div class="btn-group">
            <button class="btn-action back" @click="back">Quay lại</button>
            <button class="btn-action continue" @click="handleSubmit">Tiếp tục</button>
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
import { maxLength, required, isNotFormatPassword, isNotFormatEmail } from '@/plugins/vuelidate'
import { helpers } from '@vuelidate/validators'
export default {
  components: {
    IconEye,
    EyeOutlined,
    EyeInvisibleOutlined
  },
  data() {
    return {
      v$: useValidate({ $autoDirty: true }),
      email: ''
    }
  },
  validations() {
    return {
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
      }
    }
  },
  methods: {
    handleBlurInput(key) {
      this.v$[key].$touch()
    },
    back() {
      console.log('REDIRECT BACK')
    },
    async handleSubmit() {
      const isValidate = await this.v$.$validate()

      if (isValidate) {
        const params = {
          email: this.email
        }
        this.$root.$refs.loading.start()
        const res = await this.$store.dispatch('auth/login', params)
        if (res) {
          this.$notification[TYPE_ERROR]({
            message: this.$i18n.t('message.login.login'),
            description: res.error?.response.data.message
          })
        } else {
          this.$router.push({ name: 'image' })
          this.$notification[TYPE_SUCCESS]({
            message: this.$i18n.t('message.login.login'),
            description: this.$i18n.t('message.login.success')
          })
        }
        // const resp = await this.$store.dispatch('auth/me')
        // console.log(resp)
        this.$root.$refs.loading.finish()
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/pages/forgot_password';
</style>
