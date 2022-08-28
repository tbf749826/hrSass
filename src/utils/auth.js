// 本地存储token文件
import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设置一个token的key

const TimeKey = 'hrsaas-timestamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(TimeKey)
}

export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}
