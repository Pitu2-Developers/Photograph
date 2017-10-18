import Vue    from 'vue';
import Router from 'vue-router';

// importar componentes
import App    from './App.vue';
import IndexLayout  from './components/IndexLayout.vue';
import HomeLayout from './components/HomeLayout.vue';
import SignIn from './components/SignIn.vue';
import Index from './components/Index.vue';
import Home from './components/Home.vue';
import Profile from './components/Profile.vue';
import ProfileEdit from './components/ProfileEdit.vue';

//Services
import {isAuth} from '../services/index';

Vue.use(Router);


const routes= [
	{ path: '/', component: isAuth() ? HomeLayout : IndexLayout,
		children:[
			{
				path:'',
				name:isAuth() ? 'home':'login',
				component: isAuth() ? Home : Index,
				meta:{requiresAuth: isAuth() }
			},
			{
				path:'profile',
				name:'profile',
				component: Profile,
				meta:{ requiresAuth:true},
			},
			{
				path: 'profile/edit',
				name: 'profile_edit',
				component: ProfileEdit
			}
		]
	},
	{path:'*',redirect:'/'}

]

const router= new Router({routes,mode:'history'});

router.beforeEach((to,from,next)=>{
	if(!to.meta.requiresAuth ) next();
	else if(isAuth()) next()
	else next({name:'login'});
});

module.exports =router;
