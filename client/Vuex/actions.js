
import {
  LOGIN,LOGIN_SUCCESS,LOGIN_ERROR
  ,LOGOUT,ADD_USER,UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,UPLOAD_IMAGE_ERROR,
  ADD_USER_POSTS} from './constants';

import axios from 'axios';
import qs from 'querystring';
import {decodeToken} from '../../services';

const BASE_URL='http://localhost:8000';

export default{
    login({commit}, data){
      commit(LOGIN);
      const URL=`${BASE_URL}/auth/photograph`;
      const DATA= qs.stringify(data);

      return axios.post(URL,DATA)
      .then(response=>{
          localStorage.setItem('token',response.data.token);
          commit(ADD_USER,response.data.user);
          commit(LOGIN_SUCCESS);
      })
      .catch(err=>{
        commit(LOGIN_ERROR);
        return Promise.reject(err);
      });

    },
    signup({commit},data){
      // console.log(data);
      commit(LOGIN);
      const URL=`${BASE_URL}/api/users`;
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
        commit(LOGIN_ERROR);
        return Promise.reject(err);
      });

    },
    reload({commit},data){
      decodeToken(localStorage.getItem('token'))
      .then(response=>{
        const URL=`${BASE_URL}/api/users/${response}`;
        axios.get(URL)
        .then(response=>{
          console.log(response);
          commit(ADD_USER,response.data.user);
        });
      })
      .catch(e=>{
        commit(LOGOUT)
        console.log(e);
      });
    },
    logout({commit}){
      commit(LOGOUT);
    },
    upload({commit},data){
      const URL=`${BASE_URL}/api/photos/upload`;
      commit(UPLOAD_IMAGE)
      return axios.post(URL,data)
      .then(response=>{
      })
      .catch(e=>{
        console.log(e);
      });
    },
    fetch({commit},data){
      const URL=`${BASE_URL}${data.url}`;
      return axios.get(URL)
      .then(response=>{
        console.log("fetch");
        console.log(response.data);
         commit(ADD_USER_POSTS,{posts:response.data,type:data.type});
      })
      .catch(err=>{
        return Promise.reject(err);
      })
    }
}
