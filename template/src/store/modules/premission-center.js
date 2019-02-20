import { getMenuTree, logout } from '@/api/premission'
import { getToken, removeToken } from '@/utils/premissionAuth'
import { getStorage } from '@/utils/storage'
const premissionCenter = {
    state: {
        premissionToken: getToken('premission-token'),
        premissionUserInfo: JSON.parse(getStorage('premission-userInfo')),
        tabIndex: 0
    },
    mutations: {
        SETPREMISSIONTOKEN(state, val) {
            state.premissionToken = val
        },
        SETPREMISSIONUSERINFOO(state, val) {
            state.premissionUserInfo = val
        },
        SET_TABINDEX_PREMISSION(state, val) {
            state.tabIndex = val
        }
    },
    actions: {
        // 获取系统菜单
        // GetSysMenus({ commit }, sysId) {
        //   return new Promise((resolve, reject) => {
        //     getMenuTree(sysId).then(res => {
        //       const routes = getRouteData(res.data)
        //       routes.unshift({
        //         path: '',
        //         meta: { title: '/', icon: '', hidden: true },
        //         redirect: routes[0].path
        //       })
        //       routes.push({
        //         path: '*',
        //         meta: { title: '', icon: '', hidden: true },
        //         redirect: '/404'
        //       })
        //       router.addRoutes(routes)
        //       commit('SET_ROUTES', routes)
        //       resolve(res)
        //     }).catch(err => {
        //       reject(err)
        //     })
        //   })
        // },
        // 退出登录
        Logout({ commit }, token) {
            return new Promise((resolve, reject) => {
                logout(token).then(res => {
                    if (res.success) {
                        removeToken()
                        resolve(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
        }
    }
}

export default premissionCenter