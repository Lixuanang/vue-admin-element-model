import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
import { PRODUCT_ID } from '@/config/constant.conf'

const state = {
  store: null,
  globalEventDistributor: null,
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  productId: PRODUCT_ID
}

const mutations = {
  'SET_STORE'(state, store) {
    state.store = store
  },
  'SET_GLOBAL_EVENT_DISTRIBUTOR'(state, globalEventDistributor) {
    state.globalEventDistributor = globalEventDistributor
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  }
}

const actions = {
  SetStore({ commit }, store) {
    commit('SET_STORE', store)
  },
  SetGlobalEventDistributor({ commit }, globalEventDistributor) {
    commit('SET_GLOBAL_EVENT_DISTRIBUTOR', globalEventDistributor)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
