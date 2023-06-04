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
          </div>

          <div class="profile">
            <div class="profile-input">
              <label class="form-label color-dark-gray">
                <!-- {{ $i18n.t('user.first_name') }} -->
                First name
              </label>
              <div class="form-control">
                <input type="text" class="form-input" />
              </div>
            </div>
            <div class="profile-input">
              <label class="form-label color-dark-gray">
                <!-- {{ $i18n.t('user.first_name') }} -->
                First name
              </label>
              <div class="form-control">
                <input type="text" class="form-input" />
              </div>
            </div>
            <div class="profile-input">
              <label class="form-label color-dark-gray">
                <!-- {{ $i18n.t('user.first_name') }} -->
                First name
              </label>
              <div class="form-control">
                <input type="text" class="form-input" />
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
      <a-card title="Card title">
        <p>card content</p>
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
import {
  FILE_IMAGE_TYPE,
  MAX_SIZE_IMAGE
  // MAX_SIZE_IMAGE_MB,
  // MAX_FILE
} from '@/constants/dbConstant'
export default {
  data() {
    return {
      avatar: 'https://joesch.moe/api/v1/random',
      user: {
        avatar: 'https://joesch.moe/api/v1/random'
      }
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
          background-color: #f2f6f8;
        }
      }
    }
  }
}

:deep(.ant-card) {
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
</style>
