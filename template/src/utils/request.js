import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '@/utils/premissionAuth'

let loadingInstance
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 600000
})

service.interceptors.request.use(config => {
    ary.push(1)
    config.headers['token'] = getToken()
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(response => {
    // ary.pop()
    if ((response.data.errcode && response.data.errcode === 401) || (response.data.code && response.data.code === 11)) {
        Message({
                message: '登录信息失效',
                type: 'error',
                duration: 2 * 1000
            })
            // setTimeout(() => {
            //   clearCookie()
            //   removeToken()
            //   window.location.reload()
            // }, 2500)
    } else {
        return response.data
    }
}, error => {
    loadingInstance.close()
    Message({
        message: '系统繁忙，请联系管理员。',
        type: 'error',
        duration: 2 * 1000
    })
    return Promise.reject(error)
})

export default service