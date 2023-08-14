<template>
  <div class="main">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <UploadProgress ref="progress" :files="files" @close="clearFile()" />
    <file-upload
      class="btn btn-primary dropdown-toggle"
      :custom-action="customAction"
      :post-action="postAction"
      :extensions="extensions"
      :accept="accept"
      :multiple="multiple"
      :directory="directory"
      :create-directory="createDirectory"
      :size="size || 0"
      :thread="thread < 1 ? 1 : thread > 5 ? 5 : thread"
      :drop="drop"
      :drop-directory="dropDirectory"
      :add-index="addIndex"
      v-model="files"
      @input-filter="inputFilter"
      @input-file="inputFile"
      ref="upload"
    >
    </file-upload>

    <div class="wrapper-content">
      <div v-for="(months, index) in images" :key="index" class="content">
        <div class="content-time">{{ index }}</div>

        <div class="content-image">
          <div class="image" v-for="(image, i) in months" :key="i" @click="clickPhoto(image.id)">
            <img class="img-responsive" :src="image.src" alt="image" />
          </div>
        </div>
      </div>
    </div>
    <a-modal
      title=""
      width="100%"
      :footer="null"
      :closable="false"
      v-model:open="visible"
      wrap-class-name="full-modal"
      @keydown="keyboardActionDialog($event)"
    >
      <AppImageGallery
        ref="viewer"
        @left="navigate(-1)"
        @right="navigate(1)"
        :nextPhoto="nextPhoto"
        :prevPhoto="prevPhoto"
        :current-photo="currentPhoto"
        :direction="imageViewerDirection"
        :total-photo="totalPhoto"
        @close="close()"
        @detele-file="deleteFile"
        @like-file="likeFile"
      />
    </a-modal>
  </div>
</template>

<script>
// import Cropper from 'cropperjs'
// import ImageCompressor from '@xkeshi/image-compressor'
import { debounce } from 'lodash-es'
import FileUpload from 'vue-upload-component'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    FileUpload
  },

  data() {
    return {
      visible: false,
      imageViewerDirection: 0,
      images: {},
      imagesList: [],
      currentPhoto: null,
      prevPhoto: null,
      nextPhoto: null,
      files: [],
      postAction: 'http://image-storage-be.test/upload',
      accept: 'image/png,image/gif,image/jpeg,image/webp,video/mp4,audio/mp4,application/mp4',
      extensions: 'gif,jpg,jpeg,png,webp,mp4',
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 1024,
      size: 1024 * 1024 * 1000,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      createDirectory: false,
      addIndex: false,
      thread: 5,
      name: 'file',
      uploadAuto: true
    }
  },
  // computed: mapState('photo', ['search']),
  computed: {
    ...mapGetters({ search: 'photo/search' })
  },
  watch: {
    'editFile.show'(newValue, oldValue) {
      // 关闭了 自动删除 error
      if (!newValue && oldValue) {
        this.$refs.upload.update(this.editFile.id, { error: this.editFile.error || '' })
      }

      if (newValue) {
        this.$nextTick(() => {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            autoCrop: false
          })
          this.editFile = {
            ...this.editFile,
            cropper
          }
        })
      }
    },

    'addData.show'(show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    },
    async search(newVal, oldVa) {
      await this.getList()
      await this.formatListImage()
    }
  },
  async created() {
    // console.log(this.$store.getters.)
    await this.getList()
    await this.formatListImage()
  },
  mounted() {
    this.$watch(
      () => {
        return this.$refs.upload.uploaded
      },
      async (val) => {
        if (val) {
          await this.getList()
          await this.formatListImage()
          await this.$store.dispatch('user/getUserInfo')
        }
        // alert('App $watch $refs.counter.i: ' + val)
      }
    )
  },
  methods: {
    // fetchUser: debounce(async function (newVal, oldVa) {
    //   console.log(newVal, oldVa)
    // }, 300),
    async getList() {
      this.$root.$refs.loading.start()
      // this.images = {}
      const payload = {
        search: this.search
      }
      const res = await this.$store.dispatch('photo/list', payload)
      this.images = res
      this.$root.$refs.loading.finish()
    },
    formatListImage() {
      this.imagesList = []
      for (const property in this.images) {
        this.images[property].forEach((element) => {
          this.imagesList.push(element)
        })
      }
      this.totalPhoto = this.imagesList.length
    },
    clearFile() {
      this.files = []
    },
    customAction(file, component) {
      this.$refs.progress.changeVisble()
      return component.uploadHtml5(file)
    },
    inputFilter(newFile, oldFile, prevent) {
      console.log(123123)
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前

        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }

        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name) && newFile.type !== 'text/directory') {
          return prevent()
        }

        // Automatic compression
        // 自动压缩
        if (
          newFile.file &&
          newFile.error === '' &&
          newFile.type.substr(0, 6) === 'image/' &&
          this.autoCompress > 0 &&
          this.autoCompress < newFile.size
        ) {
          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: 1024 * 1024,
            maxWidth: 512,
            maxHeight: 512
          })
          imageCompressor
            .compress(newFile.file)
            .then((file) => {
              this.$refs.upload.update(newFile, {
                error: '',
                file,
                size: file.size,
                type: file.type
              })
            })
            .catch((err) => {
              this.$refs.upload.update(newFile, { error: err.message || 'compress' })
            })
        }
      }

      if (
        newFile &&
        newFile.error === '' &&
        newFile.file &&
        (!oldFile || newFile.file !== oldFile.file)
      ) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }

        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }

      // image size
      // image 尺寸
      if (
        newFile &&
        newFile.error === '' &&
        newFile.type.substr(0, 6) === 'image/' &&
        newFile.blob &&
        (!oldFile || newFile.blob !== oldFile.blob)
      ) {
        newFile.error = 'image parsing'
        let img = new Image()
        img.onload = () => {
          this.$refs.upload.update(newFile, { error: '', height: img.height, width: img.width })
        }
        img.οnerrοr = (e) => {
          this.$refs.upload.update(newFile, { error: 'parsing image size' })
        }
        img.src = newFile.blob
      }
    },

    // add, update, remove File Event
    async inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update

        if (newFile.active && !oldFile.active) {
          // beforeSend

          // min size
          if (
            newFile.size >= 0 &&
            this.minSize > 0 &&
            newFile.size < this.minSize &&
            newFile.type !== 'text/directory'
          ) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }

        if (newFile.progress !== oldFile.progress) {
          // progress
        }

        if (newFile.error && !oldFile.error) {
          // error
        }

        if (newFile.success && !oldFile.success) {
          // success
        }
      }

      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }

      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }

      if (newFile) {
        if (newFile.response && newFile.response.id && newFile.active) {
          const params = {
            id: newFile.response.id,
            modified_at: newFile.file.lastModified,
            local: newFile.response.local,
            size: newFile.file.size
          }
          await this.$store.dispatch('photo/update', params)
        }
      }
    },

    alert(message) {
      alert(message)
    },

    onEditFileShow(file) {
      this.editFile = { ...file, show: true }
      this.$refs.upload.update(file, { error: 'edit' })
    },

    onEditorFile() {
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        this.editFile.show = false
        return
      }

      let data = {
        name: this.editFile.name,
        error: ''
      }
      if (this.editFile.cropper) {
        let binStr = atob(
          this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1]
        )
        let arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        data.file = new File([arr], data.name, { type: this.editFile.type })
        data.size = data.file.size
      }
      this.$refs.upload.update(this.editFile.id, data)
      this.editFile.error = ''
      this.editFile.show = false
    },

    // add folder
    onAddFolder() {
      if (!this.$refs.upload.features.directory) {
        this.alert('Your browser does not support')
        return
      }
      let input = document.createElement('input')
      input.style =
        'background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;'
      input.type = 'file'
      input.setAttribute('allowdirs', true)
      input.setAttribute('directory', true)
      input.setAttribute('webkitdirectory', true)
      input.multiple = true
      document.querySelector('body').appendChild(input)
      input.click()
      input.onchange = (e) => {
        this.$refs.upload.addInputFile(input).then(function () {
          document.querySelector('body').removeChild(input)
        })
      }
    },

    onAddData() {
      this.addData.show = false
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        return
      }

      let file = new window.File([this.addData.content], this.addData.name, {
        type: this.addData.type
      })
      this.$refs.upload.add(file)
    },
    clickPhoto(id) {
      const index = this.imagesList.findIndex((e) => e.id === id)
      if (index >= 0) {
        this.visible = true
        this.imageViewerDirection = 0
        this.currentPhoto = {
          index: index,
          photo: this.imagesList[index]
        }
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      }
    },
    getNextSectionSegmentAsset(currentAsset, dir) {
      const assetLength = this.totalPhoto
      let nextIndex = currentAsset.index + dir
      let nextPhoto = this.imagesList[nextIndex]
      if (nextIndex < 0) {
        nextIndex = 0
        nextPhoto = currentAsset.photo
      }
      if (nextIndex > assetLength - 1) {
        nextIndex = currentAsset.index
        nextPhoto = currentAsset.photo
      }
      return {
        index: nextIndex,
        photo: nextPhoto
      }
    },
    navigate(dir) {
      this.imageViewerDirection = dir
      if (dir === 1) {
        this.prevPhoto = this.currentPhoto
        this.currentPhoto = this.nextPhoto
        this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
      } else {
        this.nextPhoto = this.currentPhoto
        this.currentPhoto = this.prevPhoto
        this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
      }
      // this.$refs.viewer.handleDescription()
    },
    keyboardActionDialog(event) {
      if (event.code == 'ArrowLeft') {
        if (this.currentPhoto.index === 0) return
        this.navigate(-1)
      } else if (event.code == 'ArrowRight') {
        this.navigate(1)
      } else if (event.code == 'Escape') {
        this.clearNav()
      }
    },
    clearNav() {
      this.currentPhoto = null
      this.prevPhoto = null
      this.nextPhoto = null
    },
    close() {
      this.visible = false
      this.$nextTick(() => {
        this.clearNav()
      })
    },
    async deleteFile(id) {
      this.$root.$refs.loading.start()
      let nextIndex
      await this.$store.dispatch('photo/delete', id)
      const assetLength = this.totalPhoto
      const index = this.imagesList.findIndex((e) => e.id === id)
      console.log(index, this.imagesList)
      this.imagesList.splice(index, 1)
      if (this.imagesList.length > 0) {
        for (const key in this.images) {
          if (Object.hasOwnProperty.call(this.images, key)) {
            let element = this.images[key]

            const i = element.findIndex((e) => e.id === id)
            if (i >= 0) {
              element.splice(i, 1)
              if (element.length === 0) {
                delete this.images[key]
              }
            }
          }
        }
        if (index === assetLength - 1) {
          nextIndex = index - 1
          this.imageViewerDirection = -1
          this.currentPhoto = {
            index: nextIndex,
            photo: this.imagesList[nextIndex]
          }
          this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
        } else if (index === 0) {
          nextIndex = index
          this.imageViewerDirection = 1
          this.currentPhoto = {
            index: nextIndex,
            photo: this.imagesList[nextIndex]
          }
          this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
        } else {
          nextIndex = index
          this.imageViewerDirection = 1
          this.currentPhoto = {
            index: nextIndex,
            photo: this.imagesList[nextIndex]
          }
          this.prevPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, -1)
          this.nextPhoto = this.getNextSectionSegmentAsset(this.currentPhoto, 1)
        }
      } else {
        this.images = {}
        this.close()
      }

      this.$root.$refs.loading.finish()
    },
    async likeFile(file) {
      this.$root.$refs.loading.start()
      let res = null
      if (file.like) {
        res = await this.$store.dispatch('photo/dislike', file.id)
      } else {
        res = await this.$store.dispatch('photo/like', file.id)
      }
      if (res.error) {
        this.$notification[TYPE_ERROR]({
          message: this.$i18n.t('message.estate.createError'),
          description: this.$i18n.t('message.estate.createError')
        })
      } else {
        await this.getList()
        await this.formatListImage()
        await this.clickPhoto(file.id)
      }
      this.$root.$refs.loading.finish()
    }
  }
}
</script>
<!-- <style>
.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all 0.2s;
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}

.example-full label.dropdown-item {
  margin-bottom: 0;
}

/* .example-full .btn-group .dropdown-toggle {
  margin-right: 0.6rem;
} */

.td-image-thumb {
  max-width: 4em;
  max-height: 4em;
}

.example-full .filename {
  margin-bottom: 0.3rem;
}

.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-foorer {
  padding: 0.5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.example-full .edit-image img {
  max-width: 100%;
}

.example-full .edit-image-tool {
  margin-top: 0.6rem;
}

.example-full .edit-image-tool .btn-group {
  margin-right: 0.6rem;
}

.example-full .footer-status {
  padding-top: 0.4rem;
}

.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style> -->
<style lang="scss" scoped>
.main {
  .wrapper-content {
    .content:last-child {
      padding-bottom: 0;
    }
    .content {
      padding-bottom: 24px;

      &-time {
        font-size: 16px;
        margin-bottom: 18px;
      }

      &-image {
        display: flex;
      }
      .content-image {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        .image {
          height: 180px;

          .img-responsive {
            height: 180px;
            width: 100%;
          }
        }
      }
    }
  }
}

:deep(.ant-modal .ant-modal-content) {
  border-radius: none !important;
  padding: 0 !important;
}
</style>

<style lang="scss">
.ant-modal-wrap {
  overflow: hidden !important;
}
.full-modal {
  .ant-modal {
    padding: 0 !important;
    max-width: 100%;
    top: 0;
    // padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    padding: 0 !important;
    border-radius: 0 !important;
    display: flex;
    flex-direction: column;
    // height: calc(100vh);
    background-color: #000;
  }
  .ant-modal-body {
    padding: 0;
    flex: 1;
  }
}

.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all 0.2s;
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}

.example-full label.dropdown-item {
  margin-bottom: 0;
}

.dropdown-toggle {
  position: absolute;
  bottom: 24px;
  right: 24px;
  overflow: initial !important;
}

.td-image-thumb {
  max-width: 4em;
  max-height: 4em;
}

.example-full .filename {
  margin-bottom: 0.3rem;
}

.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-foorer {
  padding: 0.5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.example-full .edit-image img {
  max-width: 100%;
}

.example-full .edit-image-tool {
  margin-top: 0.6rem;
}

.example-full .edit-image-tool .btn-group {
  margin-right: 0.6rem;
}

.example-full .footer-status {
  padding-top: 0.4rem;
}

.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}

.drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}

.file-uploads.file-uploads-html4 input,
.file-uploads.file-uploads-html5 label {
  cursor: pointer !important;
}
</style>
