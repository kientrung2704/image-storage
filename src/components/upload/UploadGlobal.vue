<template>
  <a-modal
    v-model:visible="visible"
    :footer="null"
    :closable="false"
    centered
    title=""
    @ok="handleOk"
    @cancel="handleClose"
  >
    <file-pond
      name="test"
      ref="pond"
      label-idle="Drop files here..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="myServer"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      @change="handleChange"
      @addfile="onAddFile"
    />
  </a-modal>
</template>

<script>
import * as exifr from 'exifr'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation
  // FilePondPluginImagePreview
)
export default {
  components: {
    FilePond
  },
  data() {
    return {
      visible: false,
      fileList: [],
      myFiles: [],
      myServer: {
        process: async (fieldName, file, metadata, load) => {
          const formData = new FormData()
          const buffer = await exifr.parse(file)
          const longitude = buffer.longitude ?? null
          const latitude = buffer.latitude ?? null

          formData.append('file', file)
          formData.append('longitude', longitude)
          formData.append('latitude', latitude)
          load()
          // request('http://localhost:8000/api/file-save', {
          //   method: 'post',
          //   data: formData
          // })
        },
        load: (source, load) => {
          fetch(source)
            .then((res) => res.blob())
            .then(load)
        }
      }
    }
  },

  methods: {
    showModal() {
      this.visible = true
    },
    handleFilePondInit() {
      // console.log('FilePond has initialized')
    },

    handleClose() {
      this.myFiles = []
    }
  }
}
</script>

<style scoped>
::v-deep(.filepond--root) {
  max-height: 300px !important;
  /* min-height: 76px;
  height: 100% !important; */
  overflow: hidden;
  margin-bottom: 0 !important;
}

::v-deep(.filepond--list-scroller) {
  overflow-y: auto;
  height: 70%;
}
</style>
