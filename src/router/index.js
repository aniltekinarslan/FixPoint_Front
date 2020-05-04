import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'
import StoklarList from '../views/pages/StokKontrol/StoklarList'
import StokHareketleriList from '../views/pages/StokKontrol/StokHareketleriList'
import TanimlamalarKullanicilarList from '../views/pages/Tanimlamalar/KullanicilarList'
import TanimlamalarModulTanimlamalariStokKontrol from '../views/pages/Tanimlamalar/ModulTanimlamalari/StokKontrol'
import MuhasebeMCarilerList from '../views/pages/Muhasebe/MCarilerList'

//import CryptoDashboard from '../views/apps/CryptoDashboard.vue'
//import EcommerceDashboard from '../views/apps/ecommerce/Dashboard.vue'
//import Calendar from '../views/apps/Calendar.vue'
//import Contacts from '../views/apps/Contacts.vue'
//import Gallery from '../views/apps/Gallery.vue'
//import Cards from '../views/apps/Cards.vue'
//import Mail from '../views/apps/Mail.vue'
//import Timeline from '../views/apps/Timeline.vue'
//import Ecommerce from './ecommerce'


import 'toastr/toastr.scss';

Vue.filter("toDouble", function(value) {
	return value.toLocaleString();
});

Vue.filter("toDoubleFixed", function(value) {
	var v = parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	return parseFloat(value) !== +value ? 0 : v;
});

Vue.config.productionTip = false;
Vue.config.silent = true;

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import Invoice from '../views/pages/Invoice.vue'

//ui
import Themes from '../views/ui/Themes.vue'
import Icons from '../views/ui/Icons/Icons.vue'
import MdIcons from '../views/ui/Icons/MdIcons.vue'
import FlagIcons from '../views/ui/Icons/FlagIcons.vue'
import MultiLanguage from '../views/ui/MultiLanguage.vue'
import HelperClasses from '../views/ui/HelperClasses.vue'
import Typography from '../views/ui/Typography.vue'
import layout from './layout'
import editors from './editors'
import charts from './charts'
import maps from './maps'
import tables from './tables'
import element from './element'

import layouts from '../layout'
import { store } from '../store/index'

Vue.use(Router);


const router = new Router({
	mode: 'history',
	//base: '/sub-path/',
	routes: [
		{
			path: '/',
			alias: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Bilgi Paneli',
				tags: ['dashboard', 'bilgi', 'panel']
			}
		},
		{
			path: '/stokkontrol/stoklar',
			name: 'stok_kontrol.stoklar.list',
			component: StoklarList,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Stoklar',
				tags: ['stok', 'stok karti', 'kart']
			}
		},
		{
			path: '/stokkontrol/stok-hareketleri',
			name: 'stok_kontrol.stok_hareketleri.list',
			component: StokHareketleriList,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Stok Hareketleri',
				tags: ['stok hareket', 'hareket']
			}
		},
		{
			path: '/muhasebe/mcariler',
			name: 'muhasebe.mcariler.list',
			component: MuhasebeMCarilerList,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Cariler',
				tags: ['cari', 'muhasebe']
			}
		},
		{
			path: '/tanimlamalar/modul-tanimlamalari/stok-kontrol',
			name: 'tanimlamalar.modul_tanimlamalari.stok_kontrol.list',
			component: TanimlamalarModulTanimlamalariStokKontrol,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Stok Kontrol',
				tags: ['tanımlama', 'tanimlama', 'modül', 'stok kontrol']
			}
		},
		{
			path: '/tanimlamalar/kullanicilar',
			name: 'tanimlamalar.kullanicilar.list',
			component: TanimlamalarKullanicilarList,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Kullanıcılar',
				tags: ['kullanici', 'personel']
			}
		},



		//{
		//	path: '/kullanici/giris',
		//	name: 'kullanici.giris',
		//	component: KullaniciGiris,
		//	meta: {
		//		auth: false,
		//		layout: layouts.contenOnly,
		//		searchable: false,
		//		title: 'Kullanıcı Girişi',
		//	}
		//},
		{
			path: '/kullanici/cikis',
			name: 'kullanici.cikis',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/kullanici/giris'})
			},
			meta: {
				auth: true,
				layout: layouts.contenOnly,
				searchable: false,
				title: 'Kullanıcı Çıkış',
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				auth: false,
				layout: layouts.contenOnly
			}
		},
		{
			path: '/logout',
			beforeEnter(to, from, next) {
				auth.logout()
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
});


const l = {
	contenOnly() {
		store.commit('app/setLayout', layouts.contenOnly)
	},
	navLeft() {
		store.commit('app/setLayout', layouts.navLeft)
	},
	navRight() {
		store.commit('app/setLayout', layouts.navRight)
	},
	navTop() {
		store.commit('app/setLayout', layouts.navTop)
	},
	navBottom() {
		store.commit('app/setLayout', layouts.navBottom)
	},
	set(layout) {
		store.commit('app/setLayout', layout)
	}
}

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters['auth/isLoggedIn']
	},
	logout() {
		return store.dispatch('auth/logout')
	},
}

router.beforeEach((to, from, next) => {

	if (!to.matched.length) {
		router.push({name: '404'});
		return;
	}

	let authRequired = false
	if(to && to.meta && to.meta.auth)
		authRequired = true

	if (authRequired && !auth.loggedIn() && to.name !== 'Login')
	{
		router.push({name: 'Login'});
		return;
	}

	if (auth.loggedIn() && to.name === 'Login')
	{
		router.push({name: 'Dashboard'});
		return;
	}

	next();

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}

})

router.afterEach((to, from) => {
	setTimeout(() => {
		store.commit('app/setSplashScreen', false)
	}, 500)
})

export default router