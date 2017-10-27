<template lang="html">
  <div class="container--fixed">
    <div class="container end">
      <label class="input__file" for="file"><i class="input__file--icon icon-camera"></i></label>
      <input  id="file" type="file" @change="onFileChange">
    </div>
  </div>
  <!-- <div class="container--fixed" v-if="image==''">
    <div class="container end">
      <label class="input__file" for="file"><i class="input__file--icon icon-camera"></i></label>
      <input  id="file" type="file" @change="onFileChange">
    </div>
  </div>
  <div class="container--fixed" v-else="">
    <div class="container end">
      <label @click="removeImage()" class="input__file" for="file"><i class="input__file--icon icon-trash"></i></label>
    </div>
  </div> -->
</template>

<script>
export default {
  data(){
    return{
      image:'',
      fil:null
    }
  },
  methods:{
    onFileChange(e){
      let file = e.target.files;
      this.fil=file[0];
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
        self.$emit('myEvent2',{image:self.image,file:this.fil});
      }
      reader.readAsDataURL(file);
    },
    removeImage(e){
      this.image='';
      this.$emit('myEvent2',{image:''});
    }
  }
}
</script>
