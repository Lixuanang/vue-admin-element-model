import { request } from '@/utils/index'
import {
  loginMap,
  userInfoMap
} from '@/api/userMap'

/**
 * 登录
 * @param {Object} params 入参
 * @return {Promise}
 */
export function login(params) {
  return request({
    url: '/paas/mm/userlogin?md=10&cmd=01',
    method: 'post',
    map: loginMap,
    params
  })
}

/**
 * 查询用户信息
 * @param {Object} params 入参
 * @return {Promise}
 */
export function userInfo(params) {
  return request({
    url: '/saas/res/org/userInfo',
    method: 'post',
    map: userInfoMap,
    params
  })
}
