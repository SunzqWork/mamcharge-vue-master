
const tree = {
  state: {
    treeData: {}
  },
  mutations: {
    SET_TREEDATA(store, data) {
      store.treeData = data
    }
  },
  actions: {
    actiontreeData({ commit }, data) {
      commit('SET_TREEDATA', data)
    }
  }
}

export default tree
