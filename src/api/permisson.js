import request from '@/utils/request'
/**
 * 获取所有权限点
 */
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    method: 'GET',
    params
  })
}

/**
 *新增权限
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

/**
 *更新权限
 */
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除权限
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
/**
 *
 *获取权限详情
 */
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
/**
 * 分配权限接口
 */
