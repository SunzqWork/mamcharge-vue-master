import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import premissionCenter from './modules/premission-center'
import tree from './modules/tree'
import cache from './modules/cache'
import components from './modules/components'
import vendor from './modules/vendor'
import org from './modules/organization'
import job from './modules/job'
import catchs from './modules/catchs'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    tagsView,
    user,
    components,
    premissionCenter,
    tree,
    cache,
    vendor,
    org,
    job,
    catchs
  },
  getters
})

export default store
