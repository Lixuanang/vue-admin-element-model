import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import errorCode from '@/config/code.conf.js'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (store.getters.userId) {
      config.headers.user_id = store.getters.userId
    }
    if (store.getters.userInfo) {
      if (store.getters.userInfo.companyId) {
        config.headers.cpy_id = store.getters.userInfo.companyId
      }
      if (store.getters.userInfo.role) {
        config.headers.user_type = store.getters.userInfo.role
      }
    }
    if (store.getters.productId) {
      config.headers.product_id = store.getters.productId
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    if (response.status !== 200) {
      return Promise.reject(response.status)
    }
    const res = response.data
    /* 错误码处理 */
    let errText
    let code
    if (res.status) {
      code = +res.status
    }
    if (Object.prototype.toString.call(res.a) === '[object Number]') {
      code = res.a
    }
    if (Object.prototype.toString.call(res.code) === '[object Number]') {
      code = res.code
    }
    if (![0, 200].includes(code)) {
      if (code in errorCode) {
        errText = errorCode[code] + ' -- C' + code
      } else {
        errText = '网络开小差了，请稍后重试！' + ' -- C' + code
      }
      Message.error(errText)
    }
    return Promise.resolve(response)
  },
  error => {
    console.log('err' + error) // for debug
    // Message.error('网络开小差了，请稍后重试！')
    return Promise.reject(error)
  }
)

export default service
