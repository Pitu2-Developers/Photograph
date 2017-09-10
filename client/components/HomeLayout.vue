<template>
  <div>
    <Header></Header>
    <main>
      <h1>PENE DE NEGRO</h1>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
export default {
  components:{Header,Footer}
}
</script>

<style lang="scss">
  main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 6rem);
  }
</style>
