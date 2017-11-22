import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import store from './Vuex/store';

Vue.use(VueSocketio,socketio('http://localhost:8000'),store);

export default{
}
