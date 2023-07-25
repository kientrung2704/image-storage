import { login, register, refreshToken, me , forgotPassword, verifyToken, changePassword} from '@/apis/auth'
import { AUTH } from '../mutation-types'
import { setAccessToken, getRememberMe, removeAccessToken } from '@/utils/token'
const state = {
  accessToken: '',
  isLogin: false
}

const getters = {
  isLogin: (state) => state.isLogin
}

const mutations = {
  [AUTH.LOGIN](state, data) {
    if (!data.error) {
      state.accessToken = data.data.access_token
      state.isLogin = true
      setAccessToken(data.data.access_token, data.data.refresh_token, null, data.data.user_id)
    }
  },

  [AUTH.SET_IS_LOGIN](state, payload) {
    state.isLogin = payload
  },

  [AUTH.LOGOUT](state) {
    state.isLogin = false
    state.accessToken = null
    removeAccessToken()
  }
}

export const actions = {
  async login({ commit }, payload) {
    const res = await login(payload)
    const data = {
      data: res
    }

    if (res.error) {
      return res
    }
    commit(AUTH.LOGIN, data)
    return false
  },

  async register({ commit }, payload) {
    const res = await register(payload)
    if (res.error) {
      return res
    }

    return false
  },

  async refreshToken({ commit }, payload) {
    const response = await refreshToken(payload)
    if (response.data) {
      const data = {
        data: response.data,
        checkBox: getRememberMe()
      }
      commit(AUTH.LOGIN, data)
    }
    return response
  },

  async logOut({ commit }) {
    commit(AUTH.LOGOUT)
  },

  async me({ commit }) {
    const res = await me()
    return res
  },

  async forgotPassword({ commit }, payload) {
    const res = await forgotPassword(payload)
    return res
  },

  async verifyToken({commit}, payload) {
    const res = await verifyToken(payload)
    return res
  },

  async changePassword({commit}, payload) {
    const res = await changePassword(payload)
    return res
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
