import { Message } from 'element-ui'
import { SHOW_ERROR_TXT } from '@/config/code.conf'
export const checkCode = res => {
  const code = res.code
  console.log(code)
  // if (res.errors || (res.data && res.data.code && res.data.code !== 0))
  if (code && code !== 0) {
    const message = code ? SHOW_ERROR_TXT(code) : '服务器忙，请稍后重试'
    Message({
      message: message,
      type: 'error',
      duration: Math.round(1.5 * 1000)
    })
  }
  return res
}
