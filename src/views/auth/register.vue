<template>
  <div class="register">
    <div class="container">
      <div class="heading">
        <h1>Register</h1>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="profile-input mb-18">
          <label for="name" class="form-label color-dark-gray">
            <!-- {{ $i18n.t('user.name') }} -->
            First Name
          </label>
          <div class="form-control">
            <input
              type="text"
              id="name"
              class="form-input"
              v-model="name"
              :class="{ 'error-border': v$.name.$errors.length > 0 }"
              @blur="handleBlurInput('name')"
            />

            <div class="text-error" v-if="v$.name.$error">
              {{ v$.name.$errors[0].$params.property }}
            </div>
          </div>
        </div>
        <!-- <div class="profile-input mb-18">
          <label for="last_name" class="form-label color-dark-gray">
            Last Name
          </label>
          <div class="form-control">
            <input
              type="text"
              id="last_name"
              class="form-input"
              v-model="last_name"
              :class="{ 'error-border': v$.last_name.$errors.length > 0 }"
              @blur="handleBlurInput('last_name')"
            />

            <div class="text-error" v-if="v$.last_name.$error">
              {{ v$.last_name.$errors[0].$params.property }}
            </div>
          </div>
        </div> -->
        <div class="profile-input mb-18">
          <label for="phone_number" class="form-label color-dark-gray">
            <!-- {{ $i18n.t('user.name') }} -->
            Phone
          </label>
          <div class="form-control">
            <input
              type="text"
              id="phone_number"
              class="form-input"
              v-model="phone_number"
              :class="{ 'error-border': v$.phone_number.$errors.length > 0 }"
              @blur="handleBlurInput('phone_number')"
            />

            <div class="text-error" v-if="v$.phone_number.$error">
              {{ v$.phone_number.$errors[0].$params.property }}
            </div>
          </div>
        </div>
        <div class="profile-input mb-18">
          <label for="email" class="form-label color-dark-gray">
            <!-- {{ $i18n.t('user.name') }} -->
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
        <div class="profile-input mb-18">
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
        <div class="profile-input mb-18">
          <label for="repeat_password" class="form-label color-dark-gray">Confirm Password</label>
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
        <button class="btn-login">Register</button>
      </form>
      <div class="register">
        Đã có tài khoản?
        <router-link :to="{ name: 'login' }" class="register-link">Đăng nhập ngay</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPE_SUCCESS, TYPE_ERROR } from '@/constants/common'
import { IconEye } from '@tabler/icons-vue'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import useValidate from '@vuelidate/core'
import {
  maxLength,
  required,
  isNotFormatPassword,
  isNotFormatEmail,
  isNotFormatPhone
} from '@/plugins/vuelidate'
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
      name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
      repeat_password: '',
      visible: true,
      visibleRepeat: true
    }
  },
  validations() {
    return {
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
          { property: this.$i18n.t('validate.phone_number.required') },
          required
        ),
        maxLength: helpers.withParams(
          { property: this.$i18n.t('validate.phone_number.max_length') },
          maxLength(11)
        ),
        isNotFormatPhone: helpers.withParams(
          { property: this.$i18n.t('validate.phone_number.format') },
          isNotFormatPhone
        )
      },
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
      },
      repeat_password: {
        required: helpers.withParams({ property: this.$i18n.t('message.title.email') }, required),
        sameAsPassword: helpers.withParams(
          { property: this.$i18n.t('message.title.111') },
          sameAs(this.password)
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
          name: this.name,
          // last_name: this.last_name,
          phone_number: this.phone_number,
          email: this.email,
          password: this.password,
          password_confirmation: this.repeat_password
        }
        this.$root.$refs.loading.start()
        const res = await this.$store.dispatch('auth/register', params)
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
@import '@/assets/style/pages/register';
</style>
