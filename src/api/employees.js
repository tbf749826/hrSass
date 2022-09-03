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
