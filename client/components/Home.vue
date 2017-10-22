<template>
  <div >
    <img class="preview-image" :src="image.preview">
    <section class="post-container">
      <form >
        <input v-model="image.caption" type="text" name="caption">
        <input @click.prevent="test()" type="submit" value="OK">
      </form>
      <Post :username='username' :profile_img="profile_img"></Post>
    </section>
    <ImageButton @myEvent2="getImage"></ImageButton>
  </div>
</template>

<script>
  import axios from 'axios';
  import ImageButton from './ImageButton.vue';
  import Post from './Post.vue';

  import {decodeToken} from '../../services';
  export default {
    components:{ImageButton,Post},
    data(){
      return{
        username:this.$store.state.user.username,
        profile_img:this.$store.state.user.profile_img,
        post:[],
        image:{
          caption:null,
          file:null,
          preview:null
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
      },
      test(){
        let data=new FormData();
        data.append('file',this.image.file,this.image.file.originalname);
        data.append('user',this.$store.state.user._id);
        data.append('caption',this.image.caption);
        this.$store.dispatch('upload',data);

      }
    },
    computed:{
      getPost(){

      }
    }
}
</script>
