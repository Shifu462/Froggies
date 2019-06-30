﻿import Vue from "vue";
import VueRouter from "vue-router";
import VueDraggable from 'vue-draggable';

import RootComponent from './components/Root.vue';
import AuthComponent from "./components/Auth.vue";
import RegisterComponent from "./components/Register.vue";
import Play from './components/Play.vue';
import LevelsList from './components/LevelsList.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueDraggable);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', redirect: '/levels' },
		{ path: '/auth', component: AuthComponent },
		{ path: '/auth/register', component: RegisterComponent },
		{ path: '/levels', component: LevelsList },
		{ path: '/play/:levelId', component: Play, props: true },
	]
});

export default new Vue( {
	el: "#app-root",
    render: h => h(RootComponent),
	router: router
} );