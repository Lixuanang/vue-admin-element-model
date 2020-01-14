/*
 * 页面请求
 * 参数 params
 * params['url']: 请求接口地址
 * params['method']: 请求接口方法
 * params['data']: 请求接口参数
 * params['res']: 接口返回值处理方法
 */

import request from '@/utils/request'
import { Message } from 'element-ui'

export const requestService = params => {
  const url = params.url
  const method = params.method || 'POST'
  const data = params.data
  const reqParams = {
    url,
    method,
    data
  }

  return request(reqParams)
    .then(res => {
      const data = params.res ? params.res(res.data) : res.data
      return Promise.resolve(data)
    })
    .catch(err => {
      // 错误处理
      Message({
        message: '网络开小差了，请稍后重试！',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(err)
    })
}
export default { requestService }
