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
  // @import url('https://fonts.googleapis.com/css?family=Allura|Arizonia|Calligraffitti|Caveat:400,700|Clicker+Script|Cookie|Courgette|Great+Vibes|La+Belle+Aurore|Marck+Script|Nothing+You+Could+Do|Parisienne|Pinyon+Script|Qwigley|Rochester|Sacramento|Shadows+Into+Light|Shadows+Into+Light+Two|Tangerine:400,700');
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


  /* git@github.com:Pitu2-Developers/Photograph.git */

</style>
