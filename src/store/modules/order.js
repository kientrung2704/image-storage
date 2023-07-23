import { order, list, detail } from '@/apis/order'
import { ORDER } from '../mutation-types'

const state = {
  orders: {}
}

const getters = {
  orders: (state) => state.orders
}

const mutations = {
  [ORDER.GET_LIST_ORDER](state, data) {
    if (!data.error) {
      state.orders = data
    }
  }
}

export const actions = {
  async order({ commit }, payload) {
    const res = await order(payload)

    return res
  },
  async list({ commit }, payload) {
    const res = await list(payload)

    commit(ORDER.GET_LIST_ORDER, res)
    return res
  },
  async detail({ commit }, payload) {
    const res = await detail(payload)

    return res
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
