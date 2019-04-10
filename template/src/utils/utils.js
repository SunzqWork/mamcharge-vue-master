// import layout from '@/views/layout/index'
import Layout from '@/views/layout/Layout'
import store from '@/store/index'
import { request } from 'http'
import { Message } from 'element-ui'
import Store from '@/store'

/**
 * 去除字符串左右空格
 * @param {*} str
 */
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}


/**
 * 获取动态路由数据
 * @param {Array} data
 * 
 * ## type
 *  0: 目录
 *  1: 菜单
 *  2: 按钮
 * 
 *  针对于权限中心这个项目来说其实是没有目录这个概念的，所谓的模块就是一个一个菜单下面的一些页面。 
 */
export function getDynamicRouterData(data) {
    let routes = []
    let route = {}
    let btns = []
    const list1 = JSON.parse(JSON.stringify(data))
    const list2 = JSON.parse(JSON.stringify(data))
    if (data instanceof Object) {
        const loop = (tree) => {
            if (tree.children && tree.children.length > 0) {
                tree.children.forEach(val => {
                    if (val.type === 0) {
                        // 模块
                        let AppName = val.url.replace("/", "").split('/')[0];
                        let sysAlias = `/${window.sysAlias}`;
                        if (AppName === "RDP") {
                            sysAlias = "";
                        }
                        var
                            route = {
                                path: `${sysAlias}${val.url}`,
                                component: Layout,
                                hidden: false,
                                name: val.url,
                                alwaysShow: true,
                                meta: { title: val.name, icon: val.icon },
                                children: val.children,
                                type: val.type
                            }

                        routes.push(route)
                    }

                    if (val.type === 2 || val.type === 1) {
                        const s = JSON.parse(JSON.stringify(val))
                            //const src = r => require.ensure([], () => r(require(`@/views/${val.extra}`)), moduleName)
                            // const src = () =>
                            //     import ( /* webpackChunkName: "[request]" */ `@/views/${moduleName}` + val.extra.substring(val.extra.indexOf('/')))
                        val.path = val.url
                            //val.component = src
                        val.type = val.type
                        val.meta = { title: s.name, icon: '' }
                        val.hidden = val.type === 2 ? true : false
                        val.children = val.type === 2 ? null : val.children
                    }

                    loop(val)

                })
            }
        }
        loop(list2)

        // 获得符合条件的按钮
        const getBtn = (tree) => {
            if (tree.children && tree.children.length > 0) {
                tree.children.forEach(val => {
                    if (val.type === 2) {
                        btns.push(val.url)
                    }
                    getBtn(val)
                })
            }
        }
        getBtn(list1)
            // 解决vue报错
        const func = (tree) => {
            if (tree.children && tree.children.length > 0) {
                tree.children.forEach(val => {
                    if (val.type === 1) {
                        val.children = null
                    }
                    func(val)
                })
            }
        }

        routes.forEach(val => {
            func(val)
        })

        return { routes, btns }
    } else {
        Message({
            type: 'error',
            message: '解析动态路由失败，可能是因为数据格式不正确，请检查。',
            duration: 3000
        })
    }
}

//删除所有cookie
export function clearCookie() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}

// 获取宽度
export function getWidth() {
    const $width = document.body.clientWidth
    const num = $width - 220
    if (store.state.org.orgTreeShow) {
        return num - 300
    } else {
        return num
    }
}

// 系统按钮级别权限控制
export function btnPermission(url) {
    const btns = Store.state.user.permissionBtns

    return btns.includes(url)
}