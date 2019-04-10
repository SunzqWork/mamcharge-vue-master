import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

const login = r => require.ensure([], () => r(require('@/views/login/index')), 'ZL_Common')
const authredirect = r => require.ensure([], () => r(require('@/views/login/authredirect')), 'ZL_Common')
const errorPage404 = r => require.ensure([], () => r(require('@/views/errorPage/404')), 'ZL_Common')
const dpEdit = r => require.ensure([], () => r(require('@/views/DevelopmentPlatform/Edit')), 'ZL_DP')
const dpindex = r => require.ensure([], () => r(require('@/views/DevelopmentPlatform/Index')), 'ZL_DP')
const testTableCom = r => require.ensure([], () => r(require('@/views/testTableCom/index')), 'ZL_DP')
const editcomponentList = r => require.ensure([], () => r(require('@/views/editcomponent/editcomponentList')), 'ZL_DP')
const Listcard = r => require.ensure([], () => r(require('@/views/card/card')), 'ZL_DP')
const jieguoindex = r => require.ensure([], () => r(require('@/views/card/jieguo')), 'ZL_DP')
const Listindex = r => require.ensure([], () => r(require('@/views/list/index')), 'ZL_DP')
const errorPage401 = r => require.ensure([], () => r(require('@/views/errorPage/401')), 'ZL_Common')

const application = r => require.ensure([], () => r(require('@/views/premission/application/index')), 'ZL_application')
export const constantRouterMap = [{
        path: '/login',
        component: login,
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: authredirect,
        hidden: true
    },
    {
        path: '/404',
        component: errorPage404,
        hidden: true
    },
    {
        path: '/401',
        component: errorPage401,
        hidden: true
    },
    {
        path: '',
        component: Layout,
        hidden: true,
        children: [{
                path: 'editcomponentAdd',
                component: dpEdit
            },
            {
                path: 'editcomponentInfo',
                component: dpindex,
            },
            {
                path: 'testTableCom',
                component: testTableCom,
            },
            {
                path: 'list',
                component: Listindex
            }
        ]
    }
]

export default new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRouterMap
    })
    //所有的路由位置
export const allRouter = [
    { path: '/DP/editcomponentList', component: editcomponentList },
    { path: '/DP/card', component: Listcard },
    { path: '/DP/details', component: jieguoindex },
    { path: '/app-center/application', component: application },

]
export const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: false }
]