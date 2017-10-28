<template lang="html">
  <div :class="{'search':true }">
    <input v-model="userInput" placeholder="Search a friend" class="search__input" type="search">
    <div  v-if="users.length >0"  class="search__box" >
      <ul>
        <router-link :to="{name:'profile', params:{username:user.username}}"  v-for="user in users" :key="user._id"  class="search__li">
          <img class="search__img" :src="user.profile_img" alt="">
          <div class="search__con">
            <p class="search__p">{{user.username}}</p>
          </div>
        </router-link>
      </ul>
    </div>
    <div v-if="users.length==0 && userInput!=''" class="search__box">
      <span class="search__span">No results found</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  // props:['username','profile'],
  data(){
    return{
        userInput:'',
        users:[],
        username:this.$store.state.user.username,
    }
  },
  methods:{

  },
  watch:{
    userInput(e,e2){
      if(e !== '')
        axios.get(`http://localhost:8000/api/users/search/${e}`)
        .then(response=>{
          this.users=response.data.filter((u)=> u.username!=this.username)

        })
        .catch(err=>{
          console.log(err);
        })
      else this.users=[]
    }
  }
}
</script>
