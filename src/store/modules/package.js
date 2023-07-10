import { getListPackage } from '@/apis/package'
import { PACKAGE } from '../mutation-types'

const state = {
  packages: []
}

const getters = {
  packages: (state) => state.packages
}

const mutations = {
  [PACKAGE.GET_LIST_PACKAGE](state, data) {
    if (!data.error) {
      state.packages = data
    }
  }
}

export const actions = {
  async listPackage({ commit }, _) {
    const res = await getListPackage()

    commit(PACKAGE.GET_LIST_PACKAGE, res)
    return res
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
