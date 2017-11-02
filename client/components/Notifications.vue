<template lang="html">
  <li @click="show = !show" class="header__li notifications">
    <div v-if="requests.length>0" class="notifications__count">
      <span  >{{requests.length}}</span>
    </div>
    <i  title="Notifications" class="icon-heart"></i>

    <ul v-if="show" class="notification-box">
      <li class="notification notification--header">
        <p v-if="requests.length>0" class="notification__title">Follow requests</p>
        <p v-else="" class="notification__title">Any requests</p>

      </li>
      <li v-for="request in requests" class="notification">
        <img :src="request.img" alt="">
        <div class="notification__con">
          <div>
            <p class="notification__username">{{request.username}}</p>
            <p class="notification__name">{{request.name}}</p>
          </div>
          <div class="notification__icons">
            <i class="icon-check"></i>
            <i class="icon-times"></i>
          </div>
        </div>
      </li>

    </ul>
  </li>
</template>

<script>
export default {
  props:['requests','showNoti'],
  data(){
    return{
      img:this.$store.state.user.profile_img,
      name:`${this.$store.state.user.first_name} ${this.$store.state.user.last_name}`,
      username:this.$store.state.user.username,
      show:false
    }
  },
  methods:{

  }
}
</script>
