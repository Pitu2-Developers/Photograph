<template>
  <div>
    <Header></Header>
    <main class="main">
    <!-- <main class="main-index"> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Header from './Header.vue';
export default {
  components:{Header},
  data(){
    return{
      scrolled:false
    }
  },
  methods:{
    handleScroll(e){
      console.log("SCROLL");
      this.scrolled=window.scrollY>0
      console.log(this.scrolled);
    }
  }
}
</script>

<style lang="scss">
  main{
    // display: flex;
    // height: calc(100vh - 6rem);
  }
</style>
