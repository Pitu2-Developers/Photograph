<template>
    <header class="header center">
      <div  class="container container--header">
        <div class="header__logo">
          <router-link to="/" class="header__title">Photograp</router-link>
        </div>
        <div class="header__icons">
          <router-link to="/profile" title="Profile" class="icon-user"></router-link>
<<<<<<< HEAD
          <i title="Notifications" class="icon-heart"></i>
=======
          <i title="Notifications" class="icon-heart-o"></i>
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
          <i @click="logout()" title="Explore" class="icon-search"></i>
        </div>
      </div>
    </header>
</template>

<script>
export default {
  methods:{
    logout(){
      this.$store.dispatch('logout')
      location.reload();
    }
  }
}
</script>
