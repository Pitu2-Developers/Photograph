<template>

  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss">
  //Imports
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300|Satisfy');
  @import "style/variables";
  @import "style/mixins";
  @import "style/styles";
  @import "style/forms";
  @import "style/flash";
  @import "style/header";
<<<<<<< HEAD

=======
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
    @media screen and (max-width: 420px){
      width: 90%;
    }
  }
  .container--header{
    display: flex;
    justify-content: space-between;
  }
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840


  /* git@github.com:Pitu2-Developers/Photograph.git */

</style>
