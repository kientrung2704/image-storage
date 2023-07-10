import { order } from '@/apis/order'

const state = {}

const getters = {}

const mutations = {}

export const actions = {
  async order({ commit }, payload) {
    const res = await order(payload)

    return res
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
