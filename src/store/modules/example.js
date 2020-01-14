import {
  example
} from '@/api/example'

const state = {
  company: ''
}

const mutations = {
  'SET_COMPANY'(state, company) {
    state.company = company
  }
}

const actions = {
  // example
  Example({ commit }, data) {
    return new Promise((resolve, reject) => {
      example(data)
        .then(res => {
          if (res && res.data) {
            commit('SET_COMPANY', res.data.company)
            // 改造数据
            res.data.cargo = '覃超成'
            resolve(res)
          }
        })
        .catch(err => {
          err && reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
