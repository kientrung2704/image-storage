import { getUserInfo, updateUserInfo } from '@/apis/user'
import { USERS } from '../mutation-types'

export const state = {
  user: {}
}

const getters = {
  userInfo: (state) => {
    return state.user
  }
}

export const mutations = {
  [USERS.GET_USER_INFO](state, data) {
    if (!data.error) {
      state.user = data
      state.user.avatar = state.user.avatar
        ? import.meta.env.VITE_VUE_APP_API_BASE_URL + '/storage/upload/' + state.user.avatar
        : 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
    }
  }
}

export const actions = {
  async getUserInfo({ commit }) {
    const res = await getUserInfo()
    commit(USERS.GET_USER_INFO, res)

    return res
  },

  async update({ commit }, payload) {
    const res = await updateUserInfo(payload)
    if (res.error) {
      return res
    }
    commit(USERS.GET_USER_INFO, res)

    return false
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
