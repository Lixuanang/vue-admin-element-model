import Cookies from 'js-cookie'

const TokenKey = 'token'

function getToken() {
  return Cookies.get(TokenKey)
}

function setToken(token) {
  return Cookies.set(TokenKey, token)
}

function removeToken() {
  return Cookies.remove(TokenKey)
}

const userId = 'userId'

function setUserId(id) {
  Cookies.set(userId, id)
}

function getUserId() {
  return Cookies.get(userId)
}

function removeUserId() {
  Cookies.remove(userId)
}

const userInfo = 'userInfo'

function setUserInfo(id) {
  Cookies.set(userInfo, id)
}

function getUserInfo() {
  return Cookies.get(userInfo)
}

function removeUserInfo() {
  Cookies.remove(userInfo)
}

export {
  setToken,
  getToken,
  removeToken,
  setUserId,
  getUserId,
  removeUserId,
  setUserInfo,
  getUserInfo,
  removeUserInfo
}
