// 引入本地存储模块，持久化处理
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login } from '@/api/user.js'
// 状态
const state = {
  token: getToken() // 初始化的同时获取本地存储中的token
  // 设置token为共享状态
}
// 修改状态
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token // 将用户的token存到vuex中
    setToken(token) // 设置token存储到本地
  },
  removeToken(state) {
    state.token = null // 将vuex中的token制空
    removeToken() // 将本地存储中的token制空
  }
}
// 执行异步
const actions = {
  // 调用login接口，如果成功将数据中的token存到vuex中
  async login(context, data) {
    const results = await login(data)

    context.commit('SET_TOKEN', results)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
