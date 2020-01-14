/*
 * @Description: In User Settings Edit
 * @Author: cs
 * @Date: 2019-08-19 10:22:53
 * @LastEditTime: 2019-08-19 10:59:31
 * @LastEditors: Please set LastEditors
 */
const errorCode = {
  // 204: '暂无数据',
  2: '账号或密码错误',
  201: '参数错误',
  202: '用户ID不存在',
  203: '企业信息不存在',
  206: '账号已存在',
  207: '验证码错误',
  208: '注册异常',
  209: '调用AUV接口异常',
  210: '修改手机号失败',
  211: '修改密码失败',
  212: '原密码错误',
  215: '查询车队列表没有传状态',
  216: '司机已存在',
  217: '司机手机号没传'
}

export const SHOW_ERROR_TXT = code => errorCode[code] || ''
export default errorCode
