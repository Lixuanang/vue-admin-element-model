import defaultSettings from '@/settings'

const { showSettings, fixedHeader, header, sidebar, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  header: header,
  sidebar: sidebar,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
