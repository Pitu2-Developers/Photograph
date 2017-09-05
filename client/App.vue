<template>
  <div id="app">
    <Header></Header>
    <!-- Component  -->
    <SignUp></SignUp>
    <Footer></Footer>
  </div>

</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import SignUp from './components/SignUp.vue';

  export default {
    name: 'app',
    components:{Header,Footer,SignUp},
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
  @import "styles/variables";
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

</style>
