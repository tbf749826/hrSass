import axios from 'axios'
// 引入element-ui中的提示消息
import { Message } from 'element-ui'
// 自定义axios实例添加拦截器
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 添加请求拦截器
service.interceptors.request.use()
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
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
