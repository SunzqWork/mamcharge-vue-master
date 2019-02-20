import { login, getUserInfo, logout, getMenuTree } from '@/api/premission'
import { getToken, setToken, removeToken } from '@/utils/premissionAuth'
import { constantRouterMap, asyncRouterMap } from '@/router/index'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        setting: {
            articlePlatform: []
        },
        routers: []
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROUTES(state, routers) {
            state.routers = routers
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            debugger;
            const username = userInfo.username.trim()
            const params = {
                username,
                password: userInfo.password
            }
            return new Promise((resolve, reject) => {
                login(params).then(response => {
                    const data = response.data
                    commit('SET_TOKEN', data)
                    setToken(response.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    if (response.success) {
                        const data = response.data
                        commit('SET_NAME', data.name)
                        const avatar = data.avatar
                        commit('SET_AVATAR', avatar)
                        resolve(response)
                    } else {

                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取系统菜单
        GetSysMenus({ commit }, sysId) {
            return new Promise((resolve, reject) => {
                getMenuTree(sysId).then(res => {
                        // const routes = getRouteData(res.data)
                        commit('SET_ROUTES', [...constantRouterMap, ...asyncRouterMap])
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                    // commit('SET_ROUTES', [...constantRouterMap, ...asyncRouterMap])
                    // resolve(res)
            })
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({ commit, dispatch }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        }
    }
}

export default user