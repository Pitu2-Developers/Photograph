import Vue from 'vue';
import Vuex from 'vuex';
import {isAuth} from '../../services';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);
export const initialState={
  isLoggedIn:isAuth(),
  isLoading:false,
  user:{
    _id:null,
    username:null,
    profile_img:null,
    first_name:null,
    last_name:null,
    email:null,
    gender:null,
    posts:[],
    following:[],
    followers:[]
  },
  posts:[]
}

export default new Vuex.Store({
  plugins:[createPersistedState({storage:window.sessionStorage})],
  state:initialState,
    getters,
    mutations,
    actions
});
