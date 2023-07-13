<template>
  <div class="login">
    <div class="container">
      <div class="heading">
        <h1>Login</h1>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="profile-input mb-18">
          <label for="username" class="form-label color-dark-gray">
            <!-- {{ $i18n.t('user.first_name') }} -->
            Username
          </label>
          <div class="form-control">
            <input
              type="text"
              id="username"
              class="form-input"
              v-model="username"
              :class="{ 'error-border': v$.username.$errors.length > 0 }"
              @blur="handleBlurInput('username')"
            />

            <div class="text-error" v-if="v$.username.$error">
              {{ v$.username.$errors[0].$params.property }}
            </div>
          </div>
        </div>
        <div class="profile-input">
          <label for="password" class="form-label color-dark-gray">Password</label>
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
        <!-- <div class="forgot-password mb-18">
          <router-link :to="{ name: 'login' }">Forgot password?</router-link>
        </div> -->
        <button class="btn-login mt-12">Login</button>
      </form>
      <div class="register">
        Chưa có tài khoản?
        <router-link :to="{ name: 'register' }" class="register-link">Đăng ký ngay</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import { IconEye } from '@tabler/icons-vue'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import useValidate from '@vuelidate/core'
import { maxLength, required, isNotFormatPassword } from '@/plugins/vuelidate'
import { helpers } from '@vuelidate/validators'
import { getAccessToken } from '@/utils/token'

export default {
  components: {
    IconEye,
    EyeOutlined,
    EyeInvisibleOutlined
  },
  data() {
    return {
      v$: useValidate({ $autoDirty: true }),
      username: '',
      password: '',
      visible: true
    }
  },
  validations() {
    return {
      username: {
        required: helpers.withParams(
          { property: this.$i18n.t('message.username.required') },
          required
        ),
        maxLength: helpers.withParams(
          { property: this.$i18n.t('message.username.maxlength') },
          maxLength(255)
        )
      },
      password: {
        required: helpers.withParams(
          { property: this.$i18n.t('message.password.required') },
          required
        ),
        isNotFormatPassword: helpers.withParams(
          { property: this.$i18n.t('message.password.format') },
          isNotFormatPassword
        )
      }
    }
  },
  methods: {
    handleBlurInput(key) {
      this.v$[key].$touch()
    },
    async handleSubmit() {
      const isValidate = await this.v$.$validate()

      if (isValidate) {
        const params = {
          username: this.username,
          password: this.password
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

          // await this.$store.dispatch('user/getUserInfo')

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
@import '@/assets/style/pages/login';
</style>
