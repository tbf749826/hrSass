// 引入静态路由
import { constantRoutes, asyncRoutes } from '@/router/index'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach((key) => {
      routes.push(...asyncRoutes.filter((item) => item.name === key))
    })
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
