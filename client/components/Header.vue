<template>
    <header ref="header"  :class="{'header':true, 'center':true,'fixed':isScroll}">
      <div  class="container container--header">
        <div class="header__logo">
          <router-link to="/" class="header__title">Photograp</router-link>
        </div>
        <SearchBar ref="search_bar" v-show="showInput"></SearchBar>

        <ul class="header__icons">
          <li class="header__li">
            <router-link :to="username" title="Profile" class="icon-user"></router-link>
          </li>

          <Notifications ref="notification"></Notifications>

          <li class="header__li header__li--search">
            <i @click="showInput=!showInput" ref="search"  id="search" title="Explore" class="icon-search"></i>
          </li>

          <li @click="isShow=!isShow"  class="header__li header__li--sub">
            <i title="More..." ref="logout" class="icon-angle-down"></i>
            <ul :class="{'arrow':true,'show':isShow}">
              <li><span  @click="logout()">Logout</span></li>
            </ul>
          </li>

        </ul>
      </div>
    </header>
</template>

<script>
import SearchBar from './SearchBar.vue';
import Notifications from './Notifications.vue';
export default {
  components:{SearchBar,Notifications},
  data(){
    return{
      isScroll:false,
      isShow:false,
      showInput:false,
      username:this.$store.state.user.profile.username,
      // requests:[],
      showNotifications:true
    }
  },
  sockets:{

  },
  methods:{
    logout(){
      this.$socket.emit('logout',this.$store.state.user._id);
      this.$store.dispatch('logout')
      location.reload();
    },
    handleScroll(){
      this.isScroll=window.scrollY>0
    },
    clickHandle(e){

      if((e.target != this.$refs.logout && this.isShow) || (e.target != this.$refs.search && this.showInput) && e.target != this.$refs.search_bar.$el.children[0] ){
        this.isShow=false;
        this.showInput=false;
      }
    }
  },
  created(){
    window.addEventListener('click',this.clickHandle);
    // this.$socket.emit('getNotifications',{_id:this.$store.state.user.profile._id,to:null});
  },
  beforeMount(){
    window.addEventListener('scroll',this.handleScroll);
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.handleScroll);
  }
}
</script>
