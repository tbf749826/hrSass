import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置一个白名单，用于存放不需要token进入的页面
const whiteList = ['/login', '/404']

// 前置守卫  因为需要对路由进行权限验证所以需要使用路由守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 有token
    // 如果访问登录页面直接跳转到首页
    if (to.path === '/login') {
      next('/')
    } else {
      // 其他页面直接可以进入
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加到路由表
        next(to.path)
      }
      next()
    }
  } else {
    // 无token
    // 如果白名单里面有想要访问的页面就可以直接可以进入
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      // 否则证明访问的页面需要带有token 跳转到登录页面
      next('/login')
    }
  }
  nprogress.done()
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
