import { createApp } from 'vue'
import Cookie from 'js-cookie'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '../node_modules/nprogress/nprogress.css'
// or 'ant-design-vue/dist/antd.less'
import router from './router'
import store from './store'
// import naive from 'naive-ui'
import component from '@/plugins/componentToGlobal'
import dayjs from '@/plugins/dayjs'
import i18n from '@/plugins/i18n'
import './assets/style/style.scss'
import { vMaska } from 'maska'
import mask from '@/utils/mask'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import VueZoomer from 'vue-zoomer'
import App from './App.vue'
const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$cookie = Cookie

app
  .use(store)
  .use(router)
  .use(VueViewer)
  .use(VueZoomer)
  // .use(naive)
  .use(Antd)
  .use(component)
  .use(i18n)
  .directive('maska', vMaska)
  .directive('mask', mask)
  .mount('#app')
