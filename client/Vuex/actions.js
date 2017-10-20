
import {LOGIN,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT,ADD_USER} from './constants';
import axios from 'axios';
import qs from 'querystring';

export default{
    login({commit}, data){
      commit(LOGIN);
      const URL='http://localhost:8000/auth/photograph'
      const DATA= qs.stringify(data);

      return axios.post(URL,DATA)
      .then(response=>{
          localStorage.setItem('token',response.data.token);
          commit(ADD_USER,response.data.user);
          commit(LOGIN_SUCCESS);
      })
      .catch(err=>{
        commit(LOGIN_FAILURE);
        return Promise.reject(err);
      });

    },
    signup({commit},data){
      // console.log(data);
      commit(LOGIN);
      const URL='http://localhost:8000/api/users';
      const DATA= qs.stringify(data);
      console.log("ESTOY AQUI 2");

      return axios.post(URL,DATA)
      .then(response=>{
        console.log(response);
        localStorage.setItem('token',response.data.token);
        commit(ADD_USER,response.data.user);
        commit(LOGIN_SUCCESS);
      })
      .catch(err=>{
        console.log(err);
        commit(LOGIN_FAILURE);
        return Promise.reject(err);
      });

    },
    reload({commit},data){
      console.log(data);
      commit(ADD_USER,data);
    },
    logout({commit}){
      localStorage.removeItem('token');
      localStorage.removeItem('vuex');
      commit(LOGOUT);
    },
    fetch_data({commit}){

    }
}
