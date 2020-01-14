/**
 * 登录
 */
export const loginMap = {
  req: {
    a: 'username',
    b: 'password'
  },
  res: {
    a: 'code',
    b: 'userId',
    k: 'token'
  }
}

/**
 * 查询用户信息
 * @Doc http://showapi.di5cheng.com/index.php?s=/33&page_id=1716
 */
export const userInfoMap = {
  req: {},
  res: {
    a: 'role',
    c: 'nickname',
    d: 'username',
    e: 'jobNumber',
    f: 'companyId',
    g: 'companyName',
    h: 'status',
    i: 'companyType'
  }
}
