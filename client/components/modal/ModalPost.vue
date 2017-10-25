<template lang="html">
  <Modal  :condition='condition'>
    <header class="pmodal__header" >
      <img class="pmodal__profile" :src="profile_img" alt="">
      <p class="pmodal__title">Make a post</p>
      <span  @click="closeModal()">&times;</span>
    </header>
    <section class="pmodal__content">
      <img class="pmodal__preview" :src="preview" alt="">
      <textarea class="pmodal__caption" v-model="caption" name="caption" rows="8" cols="40" placeholder="Write a caption"></textarea>
    </section>
    <footer class="pmodal__footer">
      <input @click="sendForm()" class="pmodal__input"  type="submit" value="Post">
    </footer>
  </Modal>
</template>
<script>
  import Modal from './Modal.vue';
  export default {
    components:{Modal},
    props:['preview','profile_img','condition'],
    data(){
      return{
        caption:null,
      }
    },
    methods:{
      closeModal(){
        this.$emit('myEvent2',{image:''});
        this.$emit('closeModal');
      },
      sendForm(){
        this.$emit('sendForm',{caption:this.caption});
      }
    }
}
</script>
