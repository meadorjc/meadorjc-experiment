import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/views/Home';
import EditComponent from '@/components/customer/Edit';
import CreateComponent from '@/components/customer/Create';
import AboutComponent from '@/views/About';
import MapComponent from '@/views/Map';
Vue.use(Router)
export default new Router ({
	mode: 'history',
	routes: [
		{ path: '/', redirect: { name: 'home' } },
		{ path: '/home', name: 'home', component: HomeComponent },
		{ path: '/create', name: 'Create', component: CreateComponent },
		{ path: '/edit/:id', name: 'Edit', component: EditComponent },
		{ path: '/about', name: 'about', component: AboutComponent },
		{ path: '/map', name: 'map', component: MapComponent },
	]
});
