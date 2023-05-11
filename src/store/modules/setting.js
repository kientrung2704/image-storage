import { setting } from '@/config/setting'
import { getLanguage, setLanguage, getDateLocal, setDateLocale } from '@/utils/cookies'

const { lang, localKey } = setting

const state = {
  routerView: true,
  isMobile: false,
  lang: getLanguage() || lang,
  local: getDateLocal() || localKey
}

const getters = {
  routerView: (state) => state.routerView,
  isMobile: (state) => state.isMobile,
  lang: (state) => state.lang,
  local: (state) => state.local
}

const mutations = {
  SET_ROUTER_VIEW: (state) => {
    state.routerView = !state.routerView
  },
  CHANGE_IS_MOBILE: (state, flag) => {
    state.isMobile = flag
  },
  CHANGE_LANGUAGE: (state, lang) => {
    setLanguage(lang)
    state.lang = lang
  },
  CHANGE_LOCAL: (state, local) => {
    setDateLocale(local)
    state.local = local
  }
}

const actions = {
  setRouterView: ({ commit }, flag) => {
    commit('SET_ROUTER_VIEW', flag)
  },
  changeMobile: ({ commit }, flag) => {
    commit('CHANGE_IS_MOBILE', flag)
  },
  changeLanguage: ({ commit }, lang) => {
    commit('CHANGE_LANGUAGE', lang)
  },
  changeLocal: ({ commit }, local) => {
    commit('CHANGE_LOCAL', local)
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
