import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/premissionAuth'
import { getUserInfo } from '@/api/premission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next('/')
            NProgress.done()
        } else {
            if (sessionStorage.getItem('userInfo') == undefined || sessionStorage.getItem('userInfo') == null) {
                getUserInfo().then(response => {
                    sessionStorage.setItem('userInfo', JSON.stringify(response.data))
                    next()
                })
            } else {
                next()
            }
            if (store.getters.permission_routers.length === 0) {
                store.dispatch('GetSysMenus', window.sysId).then(response => {
                    router.addRoutes(store.getters.permission_routers)
                    next({...to, replace: true })
                })
            } else {
                next()
            }

        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})