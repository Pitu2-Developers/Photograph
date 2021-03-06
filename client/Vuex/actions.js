
import {
  SET_POST,
  SET_FOLLOW,REQUEST,
  REQUEST_SUCCESS,CANCEL_REQUEST,
  LOGIN,LOGIN_SUCCESS,LOGIN_ERROR
  ,LOGOUT,ADD_USER,UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,UPLOAD_IMAGE_ERROR,
  ADD_USER_POSTS,FOLLOW,FOLLOW_SUCCESS,FOLLOW_ERROR} from './constants';

import axios from 'axios';
import qs from 'querystring';
import {decodeToken} from '../../services';

const BASE_URL='http://localhost:8000';

export default{
    getPost({commit},data){
      const URL = `${BASE_URL}/api/users/${data}/posts`
      return axios.get(URL)
      .then(response=>{
        commit(SET_POST,response.data);
      });
    },
    setNotificationSeen({commit},data){
      console.log(`ID: ${data}`);
      const URL=`${BASE_URL}/api/follow/${data}`;
      return axios.get(URL)
      .then(response=>{});
    },
    setFollow({commit},data){
      console.log("SWET FOLLOW");
      console.log(data);
      commit(SET_FOLLOW,data);
    },
    socket_login({commit}, data){
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
      commit(LOGIN);
      const URL=`${BASE_URL}/api/users`;
      const DATA= qs.stringify(data);

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
        console.log(response);
        const URL=`${BASE_URL}/api/users/${response}`;
        return axios.get(URL)
        .then(response=>{
          commit(ADD_USER,response.data);
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
    },
    getUser({commit},data){
      const URL = `${BASE_URL}/api/users/${data}`
      return axios.get(URL)
      .then(response=>{
        console.log("A");
        console.log(response.data);
        return response.data
      })
      .catch(err=>{
        console.log(`ERROR ${err}`);
        return Promise.reject(err);
      })
    },
    follow({commit},data){
      const URL = `${BASE_URL}/api/follow`;

      commit(FOLLOW);
      return axios.post(URL,data)
      .then(response=>{
        commit(FOLLOW_SUCCESS,response.data.following);
        return response.data;

      })
      .catch(err=>{
        commit(FOLLOW_ERROR)
        console.log(err);
      });
    },
    update({commit,dispatch},data){
      console.log(data);
      const URL=`${BASE_URL}/api/users/update/${data._id}`;
      delete data.posts;
      console.log(URL);
      return axios.post(URL,data)
      .then(response=>{
        dispatch('reload');
        return response.data
      })
      .catch(err=>{
        console.log(err);
      });
    },
    cancel({commit},data){
      console.log(data);
      const URL = `${BASE_URL}/api/follow/cancel`
      return axios.post(URL,data)
      .then(response=>{
        commit(CANCEL_REQUEST,response.data.index)
      })
      .catch(err=>{
        alert(err);
      });
    },
    acceptRequest({commit},data){
      const URL = `${BASE_URL}/api/follow/accept`
      return axios.post(URL,data)
      .then(response=>{
        commit(REQUEST_SUCCESS,response.data)
      });
    },
    getFollows({commit},data){
      const URL = `${BASE_URL}/api/${data}/follows`;
      return axios.get(URL)
      .then(response=>{
        console.log(response.data);
        commit(SET_FOLLOW,response.data);
      });

    }

}
