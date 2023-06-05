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

import App from './App.vue'

import { notification } from 'ant-design-vue'
import { IconX } from '@tabler/icons-vue'
import { h } from 'vue'
const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$cookie = Cookie
notification.config({
  closeIcon: () =>
    h(IconX, { style: 'width: 18px; height: 18px; stroke-width: 3;color: #000000D9' })
})

app
  .use(store)
  .use(router)
  // .use(VueViewer)
  // .use(VueZoomer)
  // .use(naive)
  .use(Antd)
  .use(component)
  .use(i18n)
  .directive('maska', vMaska)
  .directive('mask', mask)
  .mount('#app')
