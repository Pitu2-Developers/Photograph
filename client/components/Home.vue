<template>
  <div >
    <h1>WELCOME {{name}}</h1>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        name:this.$store.state.user.first_name
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('logout')
        location.reload();
      }
    }
  }
</script>
