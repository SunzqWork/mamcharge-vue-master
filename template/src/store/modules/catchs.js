import Cookies from 'js-cookie'

const catchs = {
  state: {
    catchJob:""
  },
  mutations: {
    SET_CATCHJOB: (state, par) => {
      state.catchJob = par
    },
  },
  actions: {
    changeSetJobCatch({ commit }, par) {
      commit('SET_CATCHJOB', par)
    }
  }
}

export default catchs
