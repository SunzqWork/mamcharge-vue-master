const cache = {
  state: {
    cacheParams: {}
  },
  mutations: {
    SET_CACHEPARAMS(state, data) {
      state.cacheParams = data
    }
  },
  actions: {
    action_set_cacheParams({ commit }, data) {
      commit('SET_CACHEPARAMS', data)
    }
  }
}

export default cache
