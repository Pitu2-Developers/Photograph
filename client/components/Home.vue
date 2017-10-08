<template>
  <div >
    <h1>WELCOME {{name}}</h1>
    <form>
      <input type="file" @change="onFileChange">
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return{
        name:this.$store.state.user.first_name,
        image:''
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('logout')
        location.reload();
      },
      onFileChange(e){
        console.log("QUE PESA");
        let file = e.target.files;
        const validImageTypes=['image/gif','image/jpeg','image/png','image/jpg'];
        const isValid= validImageTypes.find(type=>type === file[0].type) != null ? true : false ;
        if(!file.length) return
        else if(isValid){
          this.createImage(file[0]);
        }
        console.log(file);
        console.log(`is valid = ${isValid}`);
      },
      createImage(file){
        let image= new Image();
        let reader = new FileReader();
        let self = this;
        reader.onload=(e)=>{
          self.image=e.target.result;
        }
        reader.readAsDataURL(file);
      },
      removeImage:function(e){
        this.image='';
      }
    }
  }
</script>
