import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import VeeValidate from 'vee-validate';
import store from './Vuex/store';



Vue.use(VeeValidate);
new Vue({
  el: '#app',
  router,
  store,
  render: h=> h(App)
})
