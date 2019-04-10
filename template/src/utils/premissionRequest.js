import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '@/utils/premissionAuth'
import { clearCookie } from './utils'
import Cookies from 'js-cookie'

// let loadingInstance
const service = axios.create({
  baseURL: process.env.PERMISSION_API,
  timeout: 60000
})

service.interceptors.request.use(config => {
  // loading
  if(config.method == "get"){
    config.data=[1,2,3,4,5]
  }
  // ary.push(1)
  config.headers['token'] = getToken()
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  console.log(response)
  // loading
  // ary.pop()
  if (response.data.errcode === 401 || response.data.errcode === 4012) {
    Message({
      message: '登录信息失效',
      type: 'error',
      duration: 2 * 1000
    })
    setTimeout(() => {
      clearCookie()
      removeToken()
      window.location.reload()
    }, 2000)
  } else if (response.data.errcode === 4020) {
    Message({
      message: response.data.errmsg,
      type: 'error',
      duration: 2 * 1000
    })
  } else if(response.data.errcode === 8001){
    setTimeout(() => {
      clearCookie()
      removeToken()
      Cookies.set('flag', 1)
      window.location.reload()
    }, 2000)
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
