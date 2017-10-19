<template>
  <div>
    <Header></Header>
<<<<<<< HEAD
    <main class="main">
=======
    <main class="main-index">
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Header from './Header.vue';
export default {
  components:{Header}
}
</script>

<style lang="scss">
  main{
    // display: flex;
    // height: calc(100vh - 6rem);
  }
</style>
