<<<<<<< HEAD
import {SIGNUP,SIGNUP_SUCCESS,
        SIGNUP_FAILURE,LOGIN,
        LOGIN_SUCCESS,LOGIN_FAILURE,
        LOGOUT,ADD_USER} from './constants';
=======
import {LOGIN,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT,ADD_USER} from './constants';
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
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
<<<<<<< HEAD
    signup({commit},data){
      console.log(data);
      commit(LOGIN);
      const URL='http://localhost:8000/api/users';
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
    reload({commit},data){
      console.log(data);
      commit(ADD_USER,data);
    },
=======
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
    logout({commit}){
      localStorage.removeItem('token');
      localStorage.removeItem('vuex');
      commit(LOGOUT);
<<<<<<< HEAD
    },
    fetch_data({commit}){
      
    }

=======
    }
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
}
