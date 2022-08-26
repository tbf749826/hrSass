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

export function getInfo(token) {}

export function logout() {}
