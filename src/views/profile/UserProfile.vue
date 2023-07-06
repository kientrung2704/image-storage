<template>
  <div class="main">
    <div class="content">
      <div class="content-container p-30">
        <div class="profile flex">
          <div class="profile-avatar">
            <n-avatar @click="selectFile" round :size="200" :src="avatar" />
            <input
              style="display: none"
              type="file"
              ref="file"
              accept="image/jpeg, image/png"
              class="d-none"
              @change="handleUpload"
            />
          </div>

          <div class="profile-info">
            <n-grid
              :x-gap="24"
              :y-gap="36"
              cols="1 s:2 m:2 l:9"
              item-responsive
              responsive="screen"
            >
              <n-grid-item span="1 s:1 m:1 l:4">
                <label class="form-label f-600 color-dark-gray">{{
                  $i18n.t('user.first_name')
                }}</label>
                <n-input
                  class="mt-12 cus-input"
                  v-model:value="user.first_name"
                  type="text"
                  placeholder="First name"
                />
              </n-grid-item>
              <n-grid-item span="1 s:1 m:1 l:4">
                <label class="form-label f-600 color-dark-gray">
                  {{ $i18n.t('user.last_name') }}
                </label>
                <n-input
                  class="mt-12 cus-input"
                  v-model:value="user.last_name"
                  type="text"
                  placeholder="Last name"
                />
              </n-grid-item>
              <n-grid-item span="1 s:1 m:1 l:4">
                <label class="form-label f-600 color-dark-gray">
                  {{ $i18n.t('user.phone_number') }}
                </label>

                <n-input
                  class="mt-12 cus-input"
                  v-model:value="user.phone_number"
                  type="text"
                  v-mask="'+84 #### ### ###'"
                  placeholder="Phone number"
                />
                {{ user.phone_number }}
              </n-grid-item>
              <n-grid-item span="1 s:1 m:1 l:4">
                <label class="form-label f-600 color-dark-gray">
                  {{ $i18n.t('user.email') }}
                </label>
                <n-input
                  class="mt-12 cus-input"
                  v-model:value="user.email"
                  type="text"
                  placeholder="Email"
                />
              </n-grid-item>
              <n-grid-item span="1 s:1 m:1 l:4">
                <label class="form-label f-600 color-dark-gray">
                  {{ $i18n.t('user.birth') }}
                </label>
                <n-date-picker
                  class="mt-12"
                  v-model:formatted-value="user.birth"
                  value-format="dd/MM/yyyy"
                  :format="format"
                  type="date"
                >
                  <template #date-icon>
                    <iconCalendar />
                  </template>
                </n-date-picker>
              </n-grid-item>
              <n-grid-item span="1 s:1 m:1 l:4">
                <label class="form-label f-600 color-dark-gray">
                  {{ $i18n.t('user.city') }}
                </label>
                <n-input
                  class="mt-12 cus-input"
                  v-model:value="user.city"
                  type="text"
                  placeholder="City"
                />
              </n-grid-item>
              <n-grid-item span="1 s:2 m:2 l:8">
                <label class="form-label f-600 color-dark-gray">
                  {{ $i18n.t('user.bio') }}
                </label>
                <n-input
                  class="mt-12 cus-input"
                  v-model:value="user.bio"
                  type="textarea"
                  :autosize="{ minRows: 6 }"
                  placeholder="Description bio"
                />
              </n-grid-item>
              <n-grid-item span="1 s:2 m:2 l:8">
                <label class="form-label f-600 color-dark-gray">
                  {{ $i18n.t('user.social_network') }}
                </label>
                <n-grid
                  :x-gap="36"
                  :y-gap="12"
                  cols="1 s:2 m:2 l:2"
                  item-responsive
                  responsive="screen"
                >
                  <n-grid-item span="1 s:1 m:1 l:1">
                    <div class="social mt-12 flex align-center">
                      <div class="social-icon mr-12">
                        <iconLinkedin />
                      </div>
                      <n-input
                        class="cus-input"
                        v-model:value="user.linkedin"
                        type="text"
                        placeholder="Linkedin"
                      />
                    </div>
                  </n-grid-item>
                  <n-grid-item span="1 s:1 m:1 l:1">
                    <div class="social mt-12 flex align-center">
                      <div class="social-icon mr-12">
                        <iconFacebook />
                      </div>
                      <n-input
                        class="cus-input"
                        v-model:value="user.facebook"
                        type="text"
                        placeholder="Facebook"
                      />
                    </div>
                  </n-grid-item>
                  <n-grid-item span="1 s:1 m:1 l:1">
                    <div class="social mt-12 flex align-center">
                      <div class="social-icon mr-12">
                        <iconBehance />
                      </div>
                      <n-input
                        class="cus-input"
                        v-model:value="user.behance"
                        type="text"
                        placeholder="Behance"
                      />
                    </div>
                  </n-grid-item>
                  <n-grid-item span="1 s:1 m:1 l:1">
                    <div class="social mt-12 flex align-center">
                      <div class="social-icon mr-12">
                        <iconInstagram />
                      </div>
                      <n-input
                        class="cus-input"
                        v-model:value="user.instagram"
                        type="text"
                        placeholder="Instagram"
                      />
                    </div>
                  </n-grid-item>
                  <n-grid-item span="1 s:1 m:1 l:1">
                    <div class="social mt-12 flex align-center">
                      <div class="social-icon mr-12">
                        <iconDribble />
                      </div>
                      <n-input
                        class="cus-input"
                        v-model:value="user.dribble"
                        type="text"
                        placeholder="Dribble"
                      />
                    </div>
                  </n-grid-item>
                  <n-grid-item span="1 s:1 m:1 l:1">
                    <div class="social mt-12 flex align-center">
                      <div class="social-icon mr-12">
                        <iconGithub />
                      </div>
                      <n-input
                        class="cus-input"
                        v-model:value="user.github"
                        type="text"
                        placeholder="Github"
                      />
                    </div>
                  </n-grid-item>
                </n-grid>
              </n-grid-item>
              <n-grid-item span="1 s:2 m:2 l:8">
                <div class="button-content">
                  <n-button @click="submit" type="primary">
                    {{ $i18n.t('save info') }}
                  </n-button>
                </div>
              </n-grid-item>
            </n-grid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FILE_IMAGE_TYPE,
  MAX_SIZE_IMAGE
  // MAX_SIZE_IMAGE_MB,
  // MAX_FILE
} from '@/constants/dbConstant'
export default {
  data() {
    return {
      user: {
        avatar: null,
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        birth: this.$dayjs().format('DD/MM/YYYY'),
        city: '',
        bio: '',
        linkedin: '',
        facebook: '',
        behance: '',
        instagram: '',
        dribble: '',
        github: ''
      },
      format: 'dd/MM/yyyy',
      avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    }
  },

  methods: {
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

    submit() {
      this.user.phone_number = this.user.phone_number.replace('+84', '').replace(/ /g, '')
      console.log(this.user.phone_number)
    },

    notification(type, content, meta) {
      $notification[type]({
        content: content,
        meta: meta,
        duration: 2.5,
        keepAliveOnHover: true
      })
    }
  },

  mounted() {
    document.getElementsByClassName('layout-content')[0].style.height = '100%'
    document.getElementsByClassName('main')[0].style.height = '100%'
  },

  beforeUnmount() {
    document.getElementsByClassName('layout-content')[0].style.height = null
    document.getElementsByClassName('main')[0].style.height = null
  }
}
</script>

<style lang="scss" scoped></style>

<style lang="scss">
// .n-input__input-el,
// .n-input__textarea-el {
//   color: #63647f;
//   font-weight: 600;
// }
</style>
