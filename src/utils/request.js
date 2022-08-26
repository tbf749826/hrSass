import axios from 'axios'
// 自定义axios实例添加拦截器
const service = axios.create()
// 添加请求拦截器
service.interceptors.request.use()
// 添加响应拦截器
service.interceptors.response.use()

export default service
