import { createI18n } from 'vue-i18n'

import { getLanguage } from '@/utils/cookies'

// import { enUS, viVN } from 'naive-ui'
import enUs from 'ant-design-vue/es/locale/en_US'
import viVn from 'ant-design-vue/es/locale/vi_VN'

// User defined lang
import enLocale from './lang/en'
import vnLocale from './lang/vn'

const messages = {
  enUS: {
    ...enUs,
    ...enLocale
  },
  viVN: {
    ...viVn,
    ...vnLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  return 'viVN'
}

const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n
