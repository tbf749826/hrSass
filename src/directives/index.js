// 封装自定义指令模块

// 解决图片加载404的问题
export const imagerror = {
  inserted(dom, options) {
    dom.onerror = function () {
      dom.src = options.value
    }
  }
}
