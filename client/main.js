import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
new Vue({
  el: '#app',
  router,
  render: h=> h(App)
})
