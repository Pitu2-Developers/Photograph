import {LOGIN,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT,ADD_USER} from './constants';
import {initialState} from './store';

export default{
  [LOGIN] (state){
    state.isLoading=true;
  },
  [LOGIN_SUCCESS] (state){
    state.isLoggedIn=true;
    state.isLoading=false;

  },
  [LOGIN_FAILURE](state){
    state.isLoading=false
  },
  [LOGOUT](state){
    localStorage.removeItem('token');
    Object.assign(state,initialState);
    state.isLoggedIn=false;
    console.log("LOGOUT");

  },
  [ADD_USER](state,user){
<<<<<<< HEAD
    state.user._id=user._id;
=======
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
    state.user.first_name=user.first_name;
    state.user.last_name=user.last_name;
    state.user.email=user.email;

  }
}
