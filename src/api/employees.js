import request from '@/utils/request'

/**
 * 获取简单员工列表
 * @returns Promise
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 *
 * @param {Object} params page页面 和 每页条数
 * @returns Pormise
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 *根据id删除员工
 * @param {String} id
 * @returns Promise
 */

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 *新增员工接口
 */

export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * 导入员工的接口
 */

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
