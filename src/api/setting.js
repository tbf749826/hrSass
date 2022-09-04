import request from '@/utils/request'
/**
 * 读取公司角色信息
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role'
  })
}

/**
 * 根据id查询企业
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 *根据id删除角色
 */

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
/**
 *根据id更新角色
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'PUT'
  })
}

/**
 *根据id获取角色
 */
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 *添加角色
 */

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
