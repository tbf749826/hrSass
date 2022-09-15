// 引入本地存储模块，持久化处理
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth.js'
import { login, getInfo, getUserDetailById } from '@/api/user.js'
import { resetRouter } from '@/router'
// 状态
const state = {
  token: getToken(), // 初始化的同时获取本地存储中的token
  // 设置token为共享状态
  // 用户信息
  userInfo: {}
}
// 修改状态
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token // 将用户的token存到vuex中
    setToken(token) // 设置token存储到本地
  },
  REMOVE_TOKEN(state) {
    state.token = null // 将vuex中的token置空
    removeToken() // 将本地存储中的token置空
  },
  SET_USER_INFO(state, payload) {
    state.userInfo = payload
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  // 调用login接口，如果成功将数据中的token存到vuex中
  async login(context, data) {
    const results = await login(data)
    console.log(results)
    // 通过mutations将获取到的token 存到vuex中
    context.commit('SET_TOKEN', results)
    setTimeStamp()
  },
  // 调用getUserInfo接口用于获取用户信息
  async getUserInfo(context) {
    const result = await getInfo()
    // 用户详情数据
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('SET_USER_INFO', { ...result, ...baseInfo })
    return result
  },
  logout(context) {
    // 清空token
    context.commit('REMOVE_TOKEN')
    // 删除用户信息
    context.commit('REMOVE_USER_INFO')
    resetRouter()
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
