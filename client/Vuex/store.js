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
<<<<<<< HEAD
    _id:null,
=======
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
    first_name:'',
    last_name:'',
    email:'',
  }
}

export default new Vuex.Store({
  plugins:[createPersistedState({storage:window.sessionStorage})],
  state:initialState,
    getters,
    mutations,
    actions
});
