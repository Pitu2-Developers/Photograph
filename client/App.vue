<template>

  <div id="app">
    <Header></Header>
    <!-- Component  -->
    <Footer></Footer>
    {{msg}}
  </div>

</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'app',
    components:{Header,Footer},
    data () {
      return {
        msg: 'Welcome to the Photograph'
      }
    }
  }
</script>

<style lang="scss">
  // Import fonts
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300|Satisfy');
  //Basic reset
  *,  *::after,*::before{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
  }

  .container{
    width: 80%;
    margin: auto;
  }

  img{
    $s:300px;
    width: $s;
    height: $s;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* git@github.com:Pitu2-Developers/Photograph.git */

</style>