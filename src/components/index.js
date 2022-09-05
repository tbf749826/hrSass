// 负责所有公共组件的注册

import PageTools from '@/components/PageTools'

export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
  }
}
