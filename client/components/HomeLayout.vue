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
  components:{Header}
}
</script>

<style lang="scss">
  main{
    // display: flex;
    // height: calc(100vh - 6rem);
  }
</style>
