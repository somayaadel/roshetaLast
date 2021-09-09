import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
         status: '',
         token: localStorage.getItem('token') || '',
         user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_user(state, user){
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        }
    },
    actions: {
        login({ commit }, userData) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: Vue.prototype.$domain_api+ 'user/admin_login', data: userData, method: 'POST' })
                    .then(resp => {
                        if (resp.data.code == 401) {
                            commit('auth_error')
                            reject(401)
                        }

                        if (resp.data.code == 200) {
                            const token = resp.data.token
                            const bearerToken = 'Bearer ' + token
                            const loginUser = resp.data.user
                            localStorage.setItem('token', token)
                           Vue.prototype.$http.defaults.headers.common['Authorization'] =  bearerToken
                            commit('auth_success', bearerToken)
                            commit('auth_user', loginUser)
                            resolve(resp)
                        }
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },

        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
               //  document.cookie("languag",locale)
               //  document.cookie = "language=" +locale  + ";" + expires + ";path=/";
                //localStorage.removeItem('locale')
                delete Vue.prototype.$http.defaults.headers.common['Authorization']
                resolve()
            })
        },

        // get_user({commit}){
        //  return new Promise((resolve, reject) => {
        //     Vue.prototype.$http.get('/user').then((res) => {
        //        commit('auth_user', res.data.user)
        //        resolve(res)
        //     });
        //  })
        // }
    },
    modules: {
    //   loader,
    //   locale
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        userData: state => state.user
    }
});