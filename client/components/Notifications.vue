<template lang="html">
  <li  @click="show = !show" class="header__li notifications">

    <div v-if="requests.length>0" class="notifications__count">
      <span  >{{requests.length}}</span>
    </div>
    <i  title="Notifications" class="icon-heart"></i>

    <ul v-if="show" class="notification-box">
      <li class="notification notification--header">
        <p  class="notification__title">Notifications</p>
      </li>
      <li class="notification notification--header">
        <p v-if="requests.length>0" class="notification__title">Follow requests</p>
        <p v-else="" class="notification__title">Any requests</p>
      </li>
      <li v-for="request in requests" v-if="request.isPending" class="notification">
        <img :src="request.user.profile.profile_img" alt="">
        <div class="notification__con">
          <div>
            <p class="notification__username">{{request.user.profile.username}}</p>
            <p class="notification__name">{{request.user.first_name}} {{request.user.last_name}}</p>
          </div>
          <div class="notification__icons">
            <i @click="acceptRequest(request)" class="icon-check"></i>
            <i class="icon-times"></i>
          </div>
        </div>
      </li>

    </ul>
  </li>
</template>

<script>
export default {
  created(){
    this.$socket.emit('getNotifications',{_id:this.$store.state.user.profile._id,to:null});
  },
  data(){
    return{
      img:this.$store.state.user.profile_img,
      name:`${this.$store.state.user.first_name} ${this.$store.state.user.last_name}`,
      username:this.$store.state.user.username,
      show:false,
      requests:[],
      notification:[]
    }
  },
  sockets:{
    getNotifications(requests){
      this.requests=requests.followers;
    },
    followRequest(request){
      this.requests.push(request);
    },
    sendNotification(notifications){
      
    }
  },
  methods:{
    acceptRequest(e){
      this.$store.dispatch('acceptRequest',{uuid:e.uuid,user:this.$store.state.user.profile._id})
      .then(()=>{
        this.$socket.emit('getNotifications',{_id:this.$store.state.user.profile._id,to:null});
        this.$socket.emit('acceptRequest',{receiver:e.user,sender:this.$store.state.user.profile.username});
      });
    }
  }
}
</script>
