import { findUser, share, list, tome, shared } from '@/apis/share'
// import { ORDER } from '../mutation-types'

const state = {
  // orders: {}
}

const getters = {
  // orders: (state) => state.orders
}

const mutations = {
  // [ORDER.GET_LIST_ORDER](state, data) {
  //   if (!data.error) {
  //     state.orders = data
  //   }
  // }
}

export const actions = {
  async findUser({ commit }, payload) {
    const res = await findUser(payload)

    return res
  },

  async share({ commit }, payload) {
    const res = await share(payload)

    return res
  },

  async list({ commit }) {
    const res = await list()
    return res
  },

  async tome({ commit }) {
    const res = await tome()
    return res
  },

  async shared({ commit }) {
    const res = await shared()
    return res
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
