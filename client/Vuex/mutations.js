import {
  SET_POST,
  SET_FOLLOW,REQUEST,REQUEST_SUCCESS,REQUEST_ERROR,
  CANCEL_REQUEST,LOGIN
  ,LOGIN_SUCCESS,LOGIN_ERROR,
  LOGOUT,ADD_USER,ADD_USER_POSTS,
  FOLLOW,FOLLOW_SUCCESS} from './constants';
import {initialState} from './store';

export default{
  [LOGIN] (state){
    state.isLoading=true;
  },
  [SET_POST](state,data){
    state.posts=data;
  },
  [SET_FOLLOW](state,data){
    state.user.profile.followers=data.followers;
    state.user.profile.following=data.following;
  },
  [REQUEST](state){
    state.isLoading=true
  },
  [REQUEST_SUCCESS](state,data){
    state.isLoading=false
    state.user.profile.followers.push(data);
  },
  [FOLLOW](state){
    state.isLoading=true;
  },
  [FOLLOW_SUCCESS](state,data){
    state.isLoading=false;
    state.user.profile.following.push(data);
  },
  [LOGIN_SUCCESS] (state){
    state.isLoggedIn=true;
    state.isLoading=false;

  },
  [LOGIN_ERROR](state){
    state.isLoading=false
  },
  [LOGOUT](state){
    localStorage.removeItem('token');
    localStorage.removeItem('vuex');
    Object.assign(state,initialState);
    state.isLoggedIn=false;
    location.reload();
    location.redirect('/')


  },
  [ADD_USER](state,user){
    state.user=user;
    location.reload();
  },
  [ADD_USER_POSTS](state,data){
    if(data.type===1) state.user.posts=data.posts
    else state.posts=data.posts
  },
  [CANCEL_REQUEST](state,data){
    console.log("DATA");
    console.log(data);
    state.user.profile.following.splice(data.index,1);
  }

}
