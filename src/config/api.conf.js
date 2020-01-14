// 开发环境
const develop = true

const FILE_PORT = 5070

const BASE_URL = develop
  ? 'https://hfile.5chengsuyun.com'
  : 'https://auv.5chengsuyun.com'

const FILE_UPLOAD_URL = develop
  ? 'http://192.168.2.118'
  : 'http://file.auv666.com'

// 文件url
export const FILE_URL = `${FILE_UPLOAD_URL}:${FILE_PORT}`
// 图片url
export const IMG_URL = `${process.env.VUE_APP_FILE}/file/downLoad?u=1&ft=8&fid=`
// 高清图片url
export const HIGH_IMG_URL = `${BASE_URL}:${FILE_PORT}/file/downLoad?u=1&ft=1&fid=`
