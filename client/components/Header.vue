<template>
    <header ref="header"  :class="{'header':true, 'center':true,'fixed':isScroll}">

      <div  class="container container--header">
        <div class="header__logo">
          <router-link to="/" class="header__title">Photograp</router-link>
        </div>
        <SearchBar v-if="showInput"></SearchBar>
        <ul class="header__icons">
          <li class="header__li">
            <router-link :to="username" title="Profile" class="icon-user"></router-link>
          </li>
          <li class="header__li">
            <i title="Notifications" class="icon-heart"></i>
          </li>
          <li class="header__li header__li--search">
            <i @click="showInput=!showInput"  title="Explore" class="icon-search"></i>
          </li>
          <li @click="isShow=!isShow" class="header__li header__li--sub">
            <i title="More..." class="icon-angle-down"></i>
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
export default {
  components:{SearchBar},
  data(){
    return{
      isScroll:false,
      isShow:false,
      showInput:false,
      username:this.$store.state.user.username,

    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      location.reload();
    },
    handleScroll(){
      this.isScroll=window.scrollY>0
    }
  },
  created(){
    console.log("CREATED");
  },
  beforeMount(){
    window.addEventListener('scroll',this.handleScroll);
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.handleScroll);
  }
}
</script>
