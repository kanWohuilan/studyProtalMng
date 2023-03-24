import { loginApi, getInfoApi, loginOutApi } from '@/api/user'
import { ActionContext } from 'vuex'

export interface userState {
  token: string,
  info: object

}
const state = (): userState => ({
  token: '', // 登录token
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state: userState) {
    return state.token
  }
}

// mutations
const mutations = {
  tokenChange(state: userState, token: string) {
    state.token = token
  },
  infoChange(state: userState, info: object) {
    state.info = info
  }
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      loginApi(params)
      .then(res => {
        commit('tokenChange', res.token)
        dispatch('getInfo', { token: res.token })
        .then(infoRes => {
          resolve(res.token)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  // get user info after user logined
  getInfo({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      getInfoApi(params)
      .then(res => {
        commit('infoChange', res.info)
        resolve(res.info)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit }: ActionContext<userState, userState>) {
    loginOutApi()
    .then(res => {

    })
    .catch(error => {

    })
    .finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      sessionStorage.removeItem('vuex')
      location.reload()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
