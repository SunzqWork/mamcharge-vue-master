import { login, getUserInfo, logout, getMenuTree, GetAppList } from '@/api/premission'
import { getToken, setToken, removeToken } from '@/utils/premissionAuth'
import { getRouteData, getDynamicRouterData } from '@/utils/utils'
import { constantRouterMap, asyncRouterMap, allRouter } from '@/router/index'
import { setStorage } from '@/utils/storage'
import Cookies from 'js-cookie'

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
        routers: [],
        permissionBtns: [],
        app: []
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
        },
        SET_PERMISSION_BTNS(state, btns) {
            state.permissionBtns = btns
        },
        SET_APP(state, app) {
            state.app = app
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
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
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    if (response.data.id) {
                        sessionStorage.setItem("ids", response.data.id)
                    }
                    if (response.success) {
                        const data = response.data
                        commit('SET_NAME', data.name)
                        const avatar = data.avatar
                        commit('SET_AVATAR', avatar)
                        setStorage('userInfo', JSON.stringify(data))
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
                    // if(res.errcode == 8001){
                    //   resolve(8001)
                    // }
                    const data = { children: res.data }
                    const sb = getDynamicRouterData(data)
                    const routes = sb.routes
                    for (let routeslist of routes) {
                        for (let routerinfo of routeslist.children) {
                            let routercomponent = window._.find(allRouter, (o) => {
                                let AppName = routeslist.path.replace("/", "").split('/')[0];
                                let sysAlias = `/${window.sysAlias}`;
                                // if (AppName === "RDP") {
                                //     sysAlias = "";
                                //     if (!this.isInclude(`/RDP/js/CommonRuntime.js`))
                                //         document.write(`<script src='/static/${window.location.hash.split('/')[1]}/js/CommonRuntime.js'><\/script>`);
                                // }
                                return `${sysAlias}${o.path}` === `${routeslist.path}/${routerinfo.path}`
                            })
                            if (routercomponent)
                                routerinfo["component"] = routercomponent["component"];
                        }
                    }
                    commit('SET_PERMISSION_BTNS', sb.btns)
                    const arr = constantRouterMap.concat(routes)
                    arr.unshift({
                        path: `/${window.sysAlias}`,
                        hidden: true,
                        redirect: `${routes[0].path}/${routes[0].children[0].path}`
                    })
                    arr.unshift({
                        path: '',
                        hidden: true,
                        redirect: `${routes[0].path}/${routes[0].children[0].path}`
                    })
                    commit('SET_ROUTES', arr)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })

                // commit('SET_ROUTES', [...constantRouterMap, ...asyncRouterMap])
                // resolve()
            })
        },
        isInclude(name, del) {
            var js = /js$/i.test(name);
            var es = document.getElementsByTagName(js ? 'script' : 'link');
            for (var i = 0; i < es.length; i++)
                if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
            return false;
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
        GetApp({ commit, state }) {
            return new Promise(resolve => {
                GetAppList().then(response => {
                    const data = response.data;
                    commit('SET_APP', data)
                });

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