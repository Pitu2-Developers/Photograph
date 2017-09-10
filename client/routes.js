import Vue    from 'vue';
import Router from 'vue-router';

// importar componentes
import App    from './App.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
import IndexLayout  from './components/IndexLayout.vue';
import HomeLayout from './components/HomeLayout.vue';

Vue.use(Router);

export default new Router({

	routes: [
		{ path: '/', component: IndexLayout },
		{ path: '/profile', component: HomeLayout },

	],

mode:'history'});
