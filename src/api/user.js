import request from '@/utils/request'

/**
 *
 * @param {Object} data里面有一个mobile手机号和password密码
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户资料的接口
 * @param {String} token需要在headers中存放token
 * @returns Promise
 */
export function getInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取员工基本信息（头像）
 * @param {String}
 * @returns
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

export function logout() {}
