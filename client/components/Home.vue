<template>
  <div >
    <!-- <h1>WELCOME {{name}}</h1> -->
    <img class="preview-image" :src="image">
    <section class="post-container">
      <!-- <form >
        <input @click.prevent="test()" type="submit" value="OK">
      </form> -->
      <article class="post">
        <header class="post__header">
          <div class="post__container">
            <img class="post__image-profile" :src="profile_img" alt="">
            <p class="post__name">{{username}}</p>
          </div>
          <i class="icon-angle-down"></i>
        </header>
        <div class="post__image">
          <img src="http://lorempixel.com/1000/1200" alt="">
        </div>
        <footer class="post__footer">
          <div class="post__actions">
            <i class="post__icon icon-heart"></i>
            <i class="post__icon icon-bubble"></i>
          </div>
          <div class="post__commentsBox">
            <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>
            <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>
            <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>
            <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>

          </div>
          <div class="post__send">
            <form class="post__sendForm">
              <input class="post__input" placeholder="Add a comment" type="text">
            </form>
          </div>
        </footer>
      </article>
    </section>
    <ImageButton @myEvent2="getImage"></ImageButton>
  </div>
</template>

<script>
  import axios from 'axios';
  import ImageButton from './ImageButton.vue';
  import {decodeToken} from '../../services';
  export default {
    components:{ImageButton},
    data(){
      return{
        username:this.$store.state.user.username,
        profile_img:this.$store.state.user.profile_img,
        image:'',
        file:null
      }
    },
    created(){
      if(!this.username){
        decodeToken(localStorage.getItem('token'))
        .then(response=>{

          console.log(response);
          const URL=`http://localhost:8000/api/users/${response}`;
          axios.get(URL)
          .then(response=>{
            console.log(response);
            this.$store.dispatch('reload',response.data.user);
            location.reload();
          });
        })
        .catch(e=>{
          this.$store.dispatch('logout');
          console.log(e);
        });
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('logout')
        location.reload();
      },
      getImage(e){
        console.log(e);
        this.image=e.image
        this.file=e.file;
        console.log(this.file);
        console.log(this.image);
      },
      test(){
        let data=new FormData();
        const URL='http://localhost:8000/api/photos/upload'
        // ,{
        //   headers:{'accept':'application/json','Content-Type':`multipart/form-data; boundary=${data._boundary}`}
        // }
        this.file.user=this.name;
        console.log(this.file);
        data.append('file',this.file,this.file.originalname);
        data.append('user',this.$store.state.user._id);
        axios.post(URL,data)
        .then(response=>{
          console.log(response);
        })
        .catch(e=>{
          console.log(e);
        });
      }
    },
    computed:{
      getPost(){

      }
    }
}
</script>
