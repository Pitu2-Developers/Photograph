<template>

  <div >
    <section class="post-container">
      <Post :username='username' :profile_img="profile_img"></Post>
    </section>
    <ImageButton @myEvent2="getImage"></ImageButton>
    <ModalPost @sendForm="sendForm" @closeModal="image.isLoading = !image.isLoading" :preview="image.preview" :profile_img="profile_img"  :condition="image.isLoading"></ModalPost>
  </div>

</template>

<script>

  import axios from 'axios';
  import ImageButton from './ImageButton.vue';
  import Post from './Post.vue';
  import ModalPost from './modal/ModalPost.vue';
  import {decodeToken} from '../../services';

  export default {
    components:{ImageButton,Post,ModalPost},
    data(){
      return{
        username:this.$store.state.user.username,
        profile_img:this.$store.state.user.profile_img,
        post:[],
        image:{
          file:null,
          preview:null,
          isLoading:false
        }

      }
    },
    created(){
      if(!this.$store.state.user._id){
        this.$store.dispatch('reload');
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('logout')
      },
      getImage(e){
        this.image.preview=e.image
        this.image.file=e.file;
        this.image.isLoading=true;
      },
      sendForm(e){
        let data=new FormData();
        data.append('file',this.image.file,this.image.file.originalname);
        data.append('user',this.$store.state.user._id);
        data.append('caption',e.caption);
        this.$store.dispatch('upload',data)
        .then(()=>{
          this.$store.dispatch('fetch',{type:1,url:`/api/users/${this.$store.state.user._id}/posts`});
          this.image.isLoading=false;
        })
        .catch((e)=>{
          console.log(`ERROR ${e}`);
        })
      }
    }
}
</script>
