const job ={
  state:{
    jobid:null
  },
  mutations: {
    SET_JOBID: (state, val) => {
      state.jobid = val
    }
  }
}
export default job