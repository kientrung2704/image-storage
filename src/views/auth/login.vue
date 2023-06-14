<template>
  <div class="login">
    <div class="container">
      <div class="heading">
        <h1>Login</h1>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="profile-input mb-18">
          <label for="email" class="form-label color-dark-gray">
            <!-- {{ $i18n.t('user.first_name') }} -->
            Email
          </label>
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
        <div class="profile-input">
          <label for="password" class="form-label color-dark-gray"> New Password </label>
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
        <div class="forgot-password mb-18">
          <router-link :to="{ name: 'login' }">Forgot password?</router-link>
        </div>
        <button class="btn-login">Login</button>
      </form>
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
      email: '',
      password: '',
      visible: true
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
      },
      password: {
        required: helpers.withParams({ property: this.$i18n.t('message.title.email') }, required),
        isNotFormatPassword: helpers.withParams(
          { property: this.$i18n.t('message.title.email_format') },
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
          email: this.email,
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
