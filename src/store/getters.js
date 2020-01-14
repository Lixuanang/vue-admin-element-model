const getters = {
  store: state => state.app.store,
  globalEventDistributor: state => state.app.globalEventDistributor,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  productId: state => state.app.productId,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  username: state => state.user.username,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo
}
export default getters
