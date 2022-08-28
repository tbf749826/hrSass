import axios from 'axios'
import store from '@/store'
// 引入element-ui中的提示消息
import { Message } from 'element-ui'

import router from '@/router/index.js'

import { getTimeStamp } from '@/utils/auth.js'

const TimeOut = 3600
// 自定义axios实例添加拦截器
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // config是请求的配置信息
    // 注入token
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('Token过期了'))
      }
      // 判断token在store中是否存在 如果有token将token放在请求头中
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, message, success } = response.data
    // 如果请求成功 则将直接将data返回
    if (success) {
      return data
    } else {
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message)) // 返回执行错误，让当前执行链跳出成功，进入catch
    }
  },
  (error) => {
    // 服务端响应回来code是10002证明token过期了，将token和用户信息清空，并跳转到登录页
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }

    return Promise.reject(error)
  }
)

function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timestamp = getTimeStamp()

  return (currentTime - timestamp) / 1000 > TimeOut
}

export default service
