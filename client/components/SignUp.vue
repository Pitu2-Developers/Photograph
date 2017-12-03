<template lang="html">

    <form accept-charset="utf-8" class="registro">
      <FlashMessage @myEvent="show" v-if="error.isError" :message="error.message" :isError="error.isError"></FlashMessage>

      <div class="form__field">
        <input v-model="data.email" v-validate="'required|email'" :class="{'input': true, 'danger': errors.has('email') }" name="email" type="text" placeholder="Email" required>
        <div v-show="errors.has('email')" :title="errors.first('email')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input v-model="data.first_name" v-validate="'required|alpha_spaces'" :class="{'input': true, 'danger': errors.has('first_name') }" name="first_name" type="text" placeholder="First name" required>
        <div v-show="errors.has('first_name')" :title="errors.first('first_name')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input v-model="data.last_name" v-validate="'required'" :class="{'input': true, 'danger': errors.has('last_name') }" type="text" name="last_name" placeholder="Last name"  required>
        <div v-show="errors.has('last_name')" :title="errors.first('last_name')" class="form__x">&times;</div>
      </div>
      <div class="form__field">
        <input v-model="data.password" v-validate="'required|min:8|confirmed:password_confirm'" type="password" name="password" placeholder="Password" :class="{'input': true, 'danger': errors.has('password') }" required>
        <div v-show="errors.has('password')" :title="errors.first('password')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input v-model="data.confirmPassword" v-validate="'required|min:8'" type="password" name="password_confirm" placeholder="Confirm password" :class="{'input': true, 'danger': errors.has('password_confirm') }" required>
        <div v-show="errors.has('password_confirm')" :title="errors.first('password_confirm')" class="form__x">&times;</div>
      </div>

    	<button :disabled="isLoading || errors.items.length >0" @click.prevent="handleSubmit()" type="submit" :class="{'submit':true, 'submit--disable': isLoading || errors.items.length>0}">Sign up</button>
      <div class="form__terms"><span class="form__span">By signing up, you agree to our </span> <span class="form__span form__span-bold">Terms & Privacy Policy</span></div>
    </form>

</template>

<script>
  import qs from 'querystring';
  import axios from 'axios';
  import FlashMessage from './FlashMessage.vue';

  export default {
  	name: 'SignUp',
    components:{FlashMessage},
    data:function(){
      return{
        data:{
          email:'',
          password:'',
          confirmPassword:'',
          first_name:'',
          last_name:''
        },
        error:{
          message:'',
          isError:false
        }
      }
    },
    methods:{
      handleSubmit(){
        let {first_name,last_name,email,password,confirmPassword}=this.data;
        this.$store.dispatch('signup',{first_name,last_name,email,password,confirmPassword})
        .then(()=>{
          document.cookie="index=false";
          location.reload();
          console.log("SUCCESS");
        })
        .catch(err=>{
          console.log('Something was wrong');
          console.log(err.response);
          this.error.message=err.response.data;
          this.error.isError=true;
        });
      },
      show(){
        this.error.isError=!this.error.isError;
      }
    },
    computed:{
      isLoading(){
        return this.$store.state.isLoading;
      }
    }
  }
</script>
