/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername() {
  return true
}

/** 密码验证
 * 6-24位字符
 */
export const isPwd = n => {
  const r = /^[\w.]{6,24}$/
  return r.test(n)
}

export function isvalidUsername(str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
/* 字母+数字 */
export function validatAlphanumeric(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}

/** 手机号验证 */
export const isTel = n => {
  const r = /^1\d{10}$/
  return r.test(n)
}
/** 密码 */
export const isPassword = n => {
  const r = /^[\w.]{6,20}$/
  return r.test(n)
}

// 车牌号
export const isCarNo = n => {
  const r = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  return r.test(n)
}
// 挂车牌号
export const isCarNo1 = n => {
  const r = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[挂]{1}$/
  return r.test(n)
}
// 验证码
export const isCode = n => {
  const r = /^\d{6}$/
  return r.test(n)
}
// 中文
export const isChinese = n => {
  const r = /^[\u4E00-\u9FA5]{2,6}$/
  return r.test(n)
}

// 验证名称
export const isGroupName = n => {
  // const r = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{2,12}$/
  const r = /^.{2,24}$/
  return r.test(n)
}
// 身份证
export const isID = n => {
  const checkCode = function(val) {
    const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    const code = val.substring(17)
    if (p.test(val)) {
      let sum = 0
      for (let i = 0; i < 17; i++) {
        sum += val[i] * factor[i]
      }
      if (parity[sum % 11].toString() === code.toUpperCase()) {
        return true
      }
    }
    return false
  }
  const checkDate = function(val) {
    const pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
    if (pattern.test(val)) {
      const year = val.substring(0, 4)
      const month = val.substring(4, 6)
      const date = val.substring(6, 8)
      const date2 = new Date(year + '-' + month + '-' + date)
      if (date2 && date2.getMonth() === parseInt(month, 10) - 1) {
        return true
      }
    }
    return false
  }
  const checkProv = function(val) {
    const pattern = /^[1-9][0-9]/
    const provs = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门'
    }
    if (pattern.test(val)) {
      if (provs[val]) {
        return true
      }
    }
    return false
  }
  const checkID = function(val) {
    if (checkCode(val)) {
      const date = val.substring(6, 14)
      if (checkDate(date)) {
        if (checkProv(val.substring(0, 2))) {
          return true
        }
      }
    }
    return false
  }

  if (n === undefined) {
    return false
  }
  console.log(checkID(n))
  return checkID(n)
}

// 校验金额
export function isPrice(n) {
  const priceRegex = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
  return priceRegex.test(n)
}
