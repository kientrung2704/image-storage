import { getPaymentDetail } from '@/apis/payment'

const state = {}

const getters = {}

const mutations = {}

export const actions = {
  async getDetail({ commit }, payload) {
    const res = await getPaymentDetail(payload)

    return res
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
