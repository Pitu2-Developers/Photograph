<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
<<<<<<< HEAD
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import SignUp from './components/SignUp.vue';

=======
>>>>>>> master
  export default {
    name: 'app',
  }

</script>

<style lang="scss">
  //Imports
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300|Satisfy');
  @import "style/variables";
  @import "style/styles";
  @import "style/forms";
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

<<<<<<< HEAD
  img{
    $s:300px;
    width: $s;
    height: $s;
  }
=======

  /* git@github.com:Pitu2-Developers/Photograph.git */
>>>>>>> master

</style>
