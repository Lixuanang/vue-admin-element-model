import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  refresh: 1
}

const mutations = {
  'REFRESH'(state) {
    state.refresh++
  }
}

const actions = {
  addRefresh({ commit }) {
    commit('REFRESH')
  }
}

export const storeInstance = new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions
})
