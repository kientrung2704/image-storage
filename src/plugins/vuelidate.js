import * as validators from '@vuelidate/validators'
import i18n from '@/locales/index'
import {
  japaneseFullWidth,
  notSameAddress,
  notSameStation,
  notSameTrainLine,
  password,
  phone,
  email,
  numericCustom,
  maxValueCustom,
  integerCustom,
  minValueCustom,
  notSameMail,
  notSameTrainLineReExhibit,
  notSameStationReExhibit,
  japaneseFullWidthAlphabet
} from '@/utils/custom-vuelidate'

// or import { createI18nMessage } from '@vuelidate/validators'
const { createI18nMessage } = validators

// Create your i18n message instance. Used for vue-i18n
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

// wrap each validator.
export const required = withI18nMessage(validators.required)
export const requiredIf = withI18nMessage(validators.requiredIf, { withArguments: true })
export const numeric = withI18nMessage(validators.numeric)
export const integer = withI18nMessage(validators.integer)
export const minLength = withI18nMessage(validators.minLength, { withArguments: true })
export const maxLength = withI18nMessage(validators.maxLength, { withArguments: true })
export const maxValue = withI18nMessage(validators.maxValue, { withArguments: true })
export const minValue = withI18nMessage(validators.minValue, { withArguments: true })
export const japaneseFullWidthOnly = withI18nMessage(japaneseFullWidth)
export const isNotSameAddress = withI18nMessage(notSameAddress)
export const isNotSameTrainLine = withI18nMessage(notSameTrainLine)
export const isNotSameStation = withI18nMessage(notSameStation)
export const isNotFormatPassword = withI18nMessage(password)
export const isNotFormatPhone = withI18nMessage(phone)
export const isNotFormatEmail = withI18nMessage(email)
export const notSamePassword = withI18nMessage(email)
export const numericCustomText = withI18nMessage(numericCustom)
export const numericMaxValueCustomText = withI18nMessage(maxValueCustom)
export const integerCustomCurrency = withI18nMessage(integerCustom)
export const minValueCustomCurrency = withI18nMessage(minValueCustom)
export const isNotSameMail = withI18nMessage(notSameMail)
export const isNotSameTrainLineReExhibit = withI18nMessage(notSameTrainLineReExhibit)
export const isNotSameStationReExhibit = withI18nMessage(notSameStationReExhibit)
export const japaneseFullWidthAlphabetOnly = withI18nMessage(japaneseFullWidthAlphabet)
