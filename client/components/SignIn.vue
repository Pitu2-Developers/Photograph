<template lang="html">

    <form accept-charset="utf-8" class="signin-form">
      <transition name="fade">
        <FlashMessage @myEvent="show" v-if="error.isError" :message="error.message" :isError="error.isError"></FlashMessage>
      </transition>
      <div class="form__field">
        <input v-model="data.email":class="{'input':true, 'danger':errors.has('email')}" type="email" name="email" placeholder="Email" v-validate="'required'">
        <div v-show="errors.has('email')" :title="errors.first('email')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input v-model="data.password" :class="{'input':true, 'danger':errors.has('password')}" type="password" name="password" placeholder="Password" v-validate="'required'">
        <div v-show="errors.has('password')" :title="errors.first('password')" class="form__x">&times;</div>
      </div>

    	<button :disabled="isLoading || errors.items.length>0" @click.prevent="handleSubmit()" type="submit" :class="{'submit':true, 'submit--disable': isLoading || errors.items.length>0}" >Sign in</button>
    </form>

</template>

<script>
import FlashMessage from './FlashMessage.vue';

export default {
	name: 'SignIn',
  components:{FlashMessage},
  data:function(){
    return{
      data:{
        email:'',
        password:''
      },
      error:{
        isError:false,
        message:''
      }
    }
  },
  methods:{
    handleSubmit(){
      let {email,password}=this.data
      this.$store.dispatch("login",{email,password} ).
      then(()=>{
        this.$router.go(this.$router.currentRoute);
      })
      .catch(err =>{
        this.error.message=err.response.data.text;
        this.error.isError=true;
      });
    },
    show(){
      this.error.isError=!this.error.isError;
    }
  },
  computed:{
    isLoading(){
      return this.$store.state.isLoading
    }
  }
}
</script>
