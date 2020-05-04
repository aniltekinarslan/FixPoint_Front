const state = {
    layout: {
        navPos: 'left', //top, bottom, left, right, false
        toolbar: 'top', //top, bottom, false
        footer: true, //above, below, false
        boxed: false, //true, false
        roundedCorners: false, //true, false
        viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
    },
    splashScreen: true,
    logged: true,
    isLoading: false,
    _fillInput: null,
    _filledData: null
};

const actions = {

};

const getters = {
    subdomain(state, getters) {
        return process.env.NODE_ENV == 'development' ? 'mgmt' : window.location.host.split('.')[0]
    },
    layout(state, getters) {
        return state.layout
    },
    navPos(state, getters) {
        return state.layout.navPos
    },
    toolbar(state, getters) {
        return state.layout.toolbar
    },
    footer(state, getters) {
        return state.layout.footer
    },
    boxed(state, getters) {
        return state.layout.boxed
    },
    roundedCorners(state, getters) {
        return state.layout.roundedCorners
    },
    viewAnimation(state, getters) {
        return state.layout.viewAnimation
    },
    isLogged(state, getters) {
        return state.logged
    },
    splashScreen(state, getters) {
        return state.splashScreen
    },
    fillInput(state, getters) {
        return state._fillInput
    },
    filledData(state, getters) {
        return state._filledData
    }
};

const mutations = {
    setLayout(state, payload) {
        if (payload && payload.navPos !== undefined)
            state.layout.navPos = payload.navPos

        if (payload && payload.toolbar !== undefined)
            state.layout.toolbar = payload.toolbar

        if (payload && payload.footer !== undefined)
            state.layout.footer = payload.footer

        if (payload && payload.boxed !== undefined)
            state.layout.boxed = payload.boxed

        if (payload && payload.roundedCorners !== undefined)
            state.layout.roundedCorners = payload.roundedCorners

        if (payload && payload.viewAnimation !== undefined)
            state.layout.viewAnimation = payload.viewAnimation
    },
    setLogin(state, payload) {
        state.logged = true
    },
    setLogout(state, payload) {
        state.layout.navPos = null
        state.layout.toolbar = null
        state.logged = false
    },
    setSplashScreen(state, payload) {
        state.splashScreen = payload
    },
    setFillInput(state, payload) {
        state._fillInput = payload
    },
    setFilledData(state, payload) {
        state._filledData = payload
    }
};

export const app = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};