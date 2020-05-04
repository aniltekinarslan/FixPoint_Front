import router from '../router';
import VueCookies from 'vue-cookies'

const userStorageNamespace = process.env.VUE_APP_COOKIE_USER;
const tokenStorageNamespace = process.env.VUE_APP_COOKIE_TOKEN;
const cookieTime = process.env.VUE_APP_COOKIE_TIME;
const cookieUrl = process.env.NODE_ENV == 'development' ? 'localhost' : process.env.VUE_APP_COOKIE_URL
const cookieSecurity = process.env.NODE_ENV == 'development' ? false : true

const user = JSON.parse(localStorage.getItem(userStorageNamespace));
const token = VueCookies.get(tokenStorageNamespace)

const state = {
    isLoggedIn: token ? true : false,
    user: user || null,
    token: token || null,
    sirketkod: null,
    isLoading: false
};

const getters = {
	token(state, getters) {
		return state.isLoggedIn && state.token ? state.token : null
    },
    isLoggedIn(state, getters) {
		return state.isLoggedIn
    },
    status(state, getters) {
        return state.isLoading
    },
    user(state) {
        return state.user
    },
};

const mutations = {
    AUTH_USER (state, payLoad) {
		state.user = payLoad
    },
    AUTH_SIRKETKOD (state, payLoad) {
		state.sirketkod = payLoad
    },
    AUTH_LOGIN (state, payLoad) {
		state.isLoggedIn = payLoad
    },
    AUTH_LOGOUT (state) {
		state.isLoggedIn = false
        state.user = null
        state.token = null
        state.sirketkod = null
    },
    AUTH_TOKEN (state, payLoad) {
        state.token = payLoad
    },
    AUTH_ISLOADING (state, payLoad) {
        state.isLoading = payLoad
    }
};

const actions = {
    logout: ({ commit, dispatch }, payLoad) => {

        VueCookies.keys().forEach(cookie => VueCookies.remove(cookie, null, cookieUrl))
        localStorage.removeItem(userStorageNamespace);

        axios.defaults.headers.common.Authorization = null
        if(!payLoad) {
            dispatch('alert/message', { type: 'error', msg: 'Çıkış yapıldı'}, { root: true })
        }
        commit('AUTH_LOGOUT')
        router.push({name: 'Login'});
    },
    user({ commit, dispatch, state}){
        axios.get('/auth/user').then((response) => {
            if (response.data.status)
            {
                localStorage.setItem(userStorageNamespace, JSON.stringify(response.data.data));
                VueCookies.set(tokenStorageNamespace, VueCookies.get(tokenStorageNamespace), cookieTime, null, cookieUrl, cookieSecurity);

                commit('AUTH_USER', response.data.data)
                commit('AUTH_SIRKETKOD', response.data.data.Sirket_Kod)

                if(router.currentRoute.name == 'Login')
                {
                    dispatch('alert/message', { type: 'success', msg: 'Başarıyla giriş yaptınız', errors: {}, title: 'Giriş yapıldı' }, { root: true })
                    router.push({name: 'Dashboard'}).catch(err => {})
                }
            }
        })
        .catch((c) => {})
        .finally((f) => { 
            commit('AUTH_ISLOADING', false)
        })
    },
    login ({ commit, dispatch }, payLoad)  {
        commit('AUTH_ISLOADING', true)
        axios.post('/auth/login', payLoad).then((response) => {
            if (response.data.status)
            {
                dispatch('token', response.data.token)
                commit('AUTH_LOGIN', true)
                dispatch('user')
            }
        }).catch((c) => {
            commit('AUTH_ISLOADING', false)
        })
    },
    token: ({ commit }, payLoad) => {
        axios.defaults.headers.common.Authorization = 'Bearer ' + payLoad

        VueCookies.set(tokenStorageNamespace, payLoad, cookieTime, null, cookieUrl, cookieSecurity);
        commit('AUTH_TOKEN', payLoad)
    },
};

export const auth = {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};