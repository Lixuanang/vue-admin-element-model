/**
 * Created by PanJiaChen on 16/11/18.
 */
import { requestService } from '@/utils/service'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time, 10) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * 删除对象里面的属性值是空或者数组
 */

export function delObjectKey(object) {
  if (!object) {
    return
  }
  for (const o in object) {
    if (
      (!object[o] && object[o] !== 0) ||
      (object[o] && object[o].length === 0)
    ) {
      delete object[o]
    }
  }
  return object
}

// 去掉输入框中的空格
export function trim(str) {
  if (str !== '') {
    str = str.replace(/^\s+|\s+$/g, '')
  }
  return str
}
/**
 * element表格合并行列
 * @param {Array} data 表格数据
 * @param {Array} merge 合并字段
 */
export function mergeTableRow(data, merge) {
  if (!merge || merge.length === 0) {
    return data
  }
  merge.forEach(m => {
    const mList = {}
    data = data.map((v, index) => {
      const rowVal = v[m]
      if (mList[rowVal]) {
        mList[rowVal]++
        data[index - (mList[rowVal] - 1)][m + '-span'].rowspan++
        v[m + '-span'] = {
          rowspan: 0,
          colspan: 0
        }
      } else {
        mList[rowVal] = 1
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}

export function getWeekStr(str) {
  // 将字符串转为标准时间格式
  const str2 = Date.parse(str)
  const date = new Date(str2)
  let month = date.getMonth() + 1
  let week = getWeekFromDate(date)
  if (week === 0) {
    // 第0周归于上月的最后一周
    month = date.getMonth()
    const dateLast = new Date()
    const dayLast = new Date(
      dateLast.getFullYear(),
      dateLast.getMonth(),
      0
    ).getDate()
    const timestamp = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      dayLast
    )
    week = getWeekFromDate(new Date(timestamp))
  }
  const time = month + '月第' + week + '周'
  return time
}

function getWeekFromDate(date) {
  // 将字符串转为标准时间格式
  let w = date.getDay() // 周几
  if (w === 0) {
    w = 7
  }
  const week = Math.ceil((date.getDate() + 7 - w) / 7) - 1
  return week
}

// 获取n个月前的今天 n是有范围限制的，最多只能到去年1月，更久之前就不行了
export function getLastMonth(n) {
  let returnDate
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // 时间的月份是从0~11
  let day = date.getDate()
  if (parseInt(month, 10) < 10) {
    month = '0' + month
  }
  if (parseInt(day, 10) < 10) {
    day = '0' + day
  }
  returnDate = year + '-' + (parseInt(month, 10) - n) + '-' + day
  // 需要考虑特殊情况:
  // 1、当前月份小于等于n月，n个月前就是属于上一年的了
  // 2、当天是31号，n个月前的今天有没有31号
  let prevSize
  if (parseInt(month, 10) <= n) { // month等于n,n个月就是属于去年
    year = parseInt(year, 10) - 1
    returnDate = year + '-' + ((12 - n) + parseInt(month, 10)) + '-' + day
    prevSize = new Date(year, ((12 - n) + parseInt(month, 10)), 0).getDate // 获取n个月前的总天数
    if (prevSize < parseInt(day, 10)) {
      returnDate = year + '-' + (12 - n + 1) + parseInt(month, 10) + '-01'
    }
  } else {
    prevSize = new Date(year, parseInt(month, 10) - n, 0).getDate // 获取n个月前的总天数
    if (prevSize < parseInt(day, 10)) {
      returnDate = year + '-' + (parseInt(month, 10) - (n - 1)) + '-01'
    }
  }
  return returnDate
}

export function getMondaySunday(n, i) {
  const now = new Date(n)
  const nowTime = now.getTime()
  const day = now.getDay() || 7
  const oneDayLong = 24 * 60 * 60 * 1000

  const MondayTime = nowTime - (day - 1) * oneDayLong
  const SundayTime = nowTime + (7 - day) * oneDayLong

  if (i === 1) {
    return parseTime(new Date(MondayTime), '{y}{m}{d}')
  } else {
    return parseTime(new Date(SundayTime), '{y}{m}{d}')
  }
}

// 获取当前月的第一天

export function getCurrentMonthFirst(n) {
  const date = new Date(n)
  date.setDate(1)
  return parseTime(date, '{y}{m}{d}')
}
// 获取当前月的最后一天
export function getCurrentMonthLast(n) {
  const date = new Date(n)
  let currentMonth = date.getMonth()
  const nextMonth = ++currentMonth
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  const oneDay = 1000 * 60 * 60 * 24
  return parseTime(new Date(nextMonthFirstDay - oneDay), '{y}{m}{d}')
}

/**
 * %后,保留一位小数 且不四舍五入
 * @param {Number} num 数据
 */
export function toFixedOneNoRound(num) {
  return Math.floor(num * 1000) / 10
}

/**
 * 判断对象中所有属性是否为空
 * @param {*} params
 * @return {Boolean} false 不含空
 *                   true  含空
 */
export function ObjAttrIsEmpty(params) {
  for (const key in params) {
    if (params[key] !== '0' && !params[key]) {
      return true
    }
  }
  return false
}

/**
 * 去抖函数
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 数据过滤(装换)器
 */
export const filter = {
  // 百分比,向下取整一位，不加百分号
  percent(a, b) {
    let res = 0
    if ((a - b) === 0 && b === 0) {
      res = 0
    } else if (b === 0) {
      res = 100
    } else {
      res = ~~(Number((a - b) / b) * 10000) / 100
    }
    return res
  }
}

/**
 * 校验数据类型
 */
export const type = (() => {
  const toString = Object.prototype.toString
  const dataType = [
    'Number', 'String', 'Boolean', 'Array', 'Object', 'Symbol',
    'Undefined', 'Null', 'Function', 'Date', 'RegExp', 'Error'
  ]
  const type = {}
  for (const typeName of dataType) {
    const fnName = `is${typeName}`
    !type[fnName] && (type[fnName] = value => {
      const checkResult = `[object ${typeName}]`
      return toString.call(value) === checkResult
    })
  }
  return type
})()

/**
 * 计算表达式的值
 * @param {*} fn
 */
export function evalFn(fn) {
  const Fn = Function
  return new Fn('return ' + fn)()
}

/**
 * 数据命名转换
 * @param {*} data
 * @param {*} keyMap
 */
export function convert(data, keyMap, ship) {
  if (!data || !keyMap || !type.isObject(data) || !type.isObject(keyMap) || !type.isArray(Object.keys(keyMap))) return {}
  let dataString = JSON.stringify(data)
  for (const key of Object.keys(keyMap)) {
    const value = keyMap[key]
    if (value && (type.isString(value) || type.isNumber(value))) {
      if (ship === 'request' || ship === 'req') {
        const reg = `/"${value}":/g`
        dataString = dataString.replace(evalFn(reg), `"${key}":`)
      } else if (ship === 'response' || ship === 'res') {
        const reg = `/"${key}":/g`
        dataString = dataString.replace(evalFn(reg), `"${value}":`)
      }
    }
  }
  let resultData = {}
  try {
    resultData = JSON.parse(dataString)
  } catch (err) {
    console.log(err)
  }
  return resultData
}

/**
 * 封装请求
 */
export function request(option) {
  if (!option || !option.url) {
    throw new Error('请求参数有误！')
  }
  const { url, method = 'post', map, params = {} } = option
  return new Promise((resolve, reject) => {
    requestService({
      url: url,
      method: method,
      data: map ? convert(params, map.req, 'req') : params
    })
      .then(res => {
        if (res) {
          resolve(map ? convert(res, map.res, 'res') : res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
