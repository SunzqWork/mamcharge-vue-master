const job ={
  state:{
    jobid: null,
    jobInfo: {},
    dialogVisible: false,
    jobStatus: '' // 1: 基本信息 2: 数据权限
  },
  mutations: {
    SET_JOBID: (state, val) => {
      state.jobid = val
    },
    SET_JOBINFO(state, val) {
      state.jobInfo = val
    },
    SET_DIALOGVISIBLE(state, val) {
      state.dialogVisible = val
    },
    SET_JOBSTATUS(state, val) {
      state.jobStatus = val
    }
  },
  actions: {
    action_set_jobid({ commit }, val) {
      commit('SET_JOBID', val)
    },
    action_set_job_info({ commit }, val) {
      commit('SET_JOBINFO', val)
    },
    action_set_dialog_visible({ commit }, val) {
      commit('SET_DIALOGVISIBLE', val)
    },
    action_set_job_status({ commit }, val) {
      commit('SET_JOBSTATUS', val)
    }
  }
}
export default job