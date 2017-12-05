import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import store from './Vuex/store';

Vue.use(VueSocketio,socketio('http://localhost:8000',{
  reconnection:true,
  reconnectionDelay:1000,
  reconnectionDelayMax:5000,
  reconnectionAttempts:Infinity,
  heartbeatTimeout:10000
}),store);

export default{
}
