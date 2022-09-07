// 负责所有公共组件的注册
import PageTools from '@/components/PageTools'

import UploadExcel from '@/components/UploadExcel'

export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
