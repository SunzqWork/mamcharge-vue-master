import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium',
    // 单独加的参数
    clientHeight: 0,
    breadcrumbList: [],
    canshu: {},
    $tableHeight: 385,
    $th: 385,
    $zlCardHeight: (document.body.offsetHeight - 168) + 'px'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    // 单独加的
    SET_CLIENTHEIGHT(state, val) {
      state.clientHeight = val
    },
    SET_BREADCRUMBLIST(state, breadcrumbList) {
      state.breadcrumbList = breadcrumbList
    },
    setcanshu(state, val) {
      state.canshu = val
    },
    SET_TABLEHEIGHT(state, val) {
      state.$tableHeight = val
    },
    SET_TABLE_TH(state, size) {
      if (size === 0 || !size || size === undefined || size === '') {
        size = 10
      }
      const th = 34
      size = size + 1
      const h = (th * size) + size > state.$tableHeight ? state.$tableHeight : (th * size) + size
      state.$th = h
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    action_set_table_height({ commit }, size) {
      commit('SET_TABLE_TH', size)
    }
  }
}

export default app
