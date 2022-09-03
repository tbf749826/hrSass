// 存放组织架构的接口
import request from '@/utils/request'
/**
 * 获取组织架构数据
 * @return Promise对象
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * 根据id删除部门
 * @params {String} id
 * @return Promise对象
 */

export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 新增部门
 */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 根据ID查询部门详情
 * @return Promise
 */
export function getDepartDetail(id) {
  request({
    url: `/company/department/${id}`
  })
}

/**
 *根据ID修改部门详情
 * @param {Object} 需要id
 * @return Promise
 */
export function updateDepartments(data) {
  request({
    url: `/company/department/${data.id}`,
    method: 'PUT'
  })
}
