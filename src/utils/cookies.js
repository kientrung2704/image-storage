import { setting } from '@/config/setting'
const { langKey, localKey } = setting
import Cookies from 'js-cookie'

export function getLanguage() {
  return Cookies.get(langKey)
}

export function setLanguage(lang) {
  return Cookies.set(langKey, lang)
}

export function getDateLocal() {
  return Cookies.get(localKey)
}

export function setDateLocale(lang) {
  return Cookies.set(localKey, lang)
}
