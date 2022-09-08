// 负责所有公共组件的注册
import PageTools from '@/components/PageTools'

import UploadExcel from '@/components/UploadExcel'

import ImageUpload from './ImageUpload'

import Print from 'vue-print-nb'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
  }
}
