import {
  setToken,
  getToken,
  removeToken,
  setUserId,
  getUserId,
  removeUserId,
  setUserInfo,
  getUserInfo,
  removeUserInfo
} from '@/utils/auth'
import {
  login,
  userInfo
} from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  nickname: '',
  username: '',
  userId: getUserId(),
  avatar: '',
  userInfo: getUserInfo()
}

const mutations = {
  'SET_TOKEN'(state, token) {
    state.token = token
  },
  'SET_NICKNAME'(state, nickname) {
    state.nickname = nickname
  },
  'SET_USERNAME'(state, name) {
    state.username = name
  },
  'SET_USER_ID'(state, id) {
    state.userId = id
  },
  'SET_AVATAR'(state, avatar) {
    state.avatar = avatar
  },
  'SET_USER_INFO'(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // 登录
  Login({ commit }, data) {
    return new Promise((resolve, reject) => {
      login(data)
        .then(res => {
          res = res.data || res
          res && res.token && setToken(res.token)
          res && res.userId && setUserId(res.userId)
          commit('SET_TOKEN', res.token)
          commit('SET_USER_ID', res.userId)
          resolve(res)
        })
        .catch(err => {
          err && reject(err)
        })
    })
  },
  // 获取用户信息
  GetUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      userInfo(data)
        .then(res => {
          if (res && res.data) {
            setUserInfo(JSON.stringify(res.data))
            commit('SET_NICKNAME', res.data.nickname)
            commit('SET_USERNAME', res.data.username)
            console.log(res.data.username)
            commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
            commit('SET_USER_INFO', res.data)
            resolve(res.data)
          }
        })
        .catch(err => {
          err && reject(err)
        })
    })
  },

  // 退出登录
  Logout({ commit }, data) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USERNAME', '')
      commit('SET_USER_ID', '')
      commit('SET_USER_INFO', '')
      removeToken()
      removeUserId()
      removeUserInfo()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
