import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置一个白名单，用于存放不需要token进入的页面
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    console.log(store.getters.token)
    // 有token
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 无token
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
