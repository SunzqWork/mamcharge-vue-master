import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang'
import './icons'
import './errorLog'
import './permission'
import './mock'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import * as filters from './filters'
import zlCard from './components/app/zl-card/index'
import orgTree from './components/app/org-tree/index'
import zlInfo from './components/app/zl-info/index.vue'
import zlHelp from './components/app/zl-user-help/index.vue'
import ChTreeTable from 'vue-table-with-tree-grid'
import { btnPermission } from './utils/utils'
import axios from 'axios'
var moment = require('moment')
var _ = require('lodash')
window.moment = moment
window._ = _
Vue.prototype.$axios = axios
Vue.component('icon', Icon)
Vue.use(Element, {
    size: Cookies.get('size') || 'medium',
    i18n: (key, value) => i18n.t(key, value)
})

// 注册全局组件
Vue.component('zl-card', zlCard)
Vue.component('zl-org-tree', orgTree)
Vue.component('zl-info', zlInfo)
Vue.component('zl-help', zlHelp)
Vue.component("ChTreeTable", ChTreeTable)


// 全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

String.prototype.trim = function(char, type) {
    if (char) {
        if (type === 'left') {
            return this.replace(new RegExp('^\\' + char + '+', 'g'), '')
        } else if (type === 'right') {
            return this.replace(new RegExp('\\' + char + '+$', 'g'), '')
        }
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '')
    }
    return this.replace(/^\s+|\s+$/g, '')
}

Vue.config.productionTip = false

Vue.prototype.btnPermission = btnPermission

const $clientHeight = document.documentElement.clientHeight
const $tableHight = $clientHeight - 334
store.commit('SET_TABLEHEIGHT', $tableHight)

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})