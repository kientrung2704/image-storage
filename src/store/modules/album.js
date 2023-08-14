import { create, list, detail, update, removeAlbum, exitAlbum } from '@/apis/album'
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
  async create({ commit }, payload) {
    const res = await create(payload)

    return res
  },
  async list({ commit }, payload) {
    const res = await list(payload)

    return res
  },
  async detail({ commit }, id) {
    const res = await detail(id)

    return res
  },
  async update({ commit }, payload) {
    const res = await update(payload)

    return res
  },
  async remove({ commit }, id) {
    const res = await removeAlbum(id)
    if (res.error) {
      return res
    }

    return false
  },
  async exit({ commit }, id) {
    const res = await exitAlbum(id)
    if (res.error) {
      return res
    }

    return false
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
