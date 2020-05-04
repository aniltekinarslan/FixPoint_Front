import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate'
import { app } from './app.module';
import { auth } from './auth.module';
import { alert } from './alert.module';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
	modules: {
		app,
		auth,
		alert
	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
});