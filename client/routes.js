import Vue    from 'vue';
import Router from 'vue-router';

// importar componentes
import App    from './App.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
import Login  from './components/Login.vue';

const a = { template: '<p>asoas</p>' };

Vue.use(Router);

export default new Router({
	routes: [
		{ path: '/', component: Login },
		{ path: '/p', component: a }
	]
});

