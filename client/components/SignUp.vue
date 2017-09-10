<template lang="html">

    <form accept-charset="utf-8" class="registro">

      <div class="form__field">
        <input v-validate="'required|email'" :class="{'input': true, 'danger': errors.has('email') }" name="email" type="text" placeholder="Email" required>
        <div v-show="errors.has('email')" :title="errors.first('email')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input v-validate="'required|alpha_spaces'" :class="{'input': true, 'danger': errors.has('first_name') }" name="first_name" type="text" placeholder="First name" required>
        <div v-show="errors.has('first_name')" :title="errors.first('first_name')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input v-validate="'required'" :class="{'input': true, 'danger': errors.has('last_name') }" type="text" name="last_name" placeholder="Last name"  required>
        <div v-show="errors.has('last_name')" :title="errors.first('last_name')" class="form__x">&times;</div>
      </div>
      <div class="form__field">
        <input v-validate="'required|min:8|confirmed:password_confirm'" type="password" name="password" placeholder="Password" :class="{'input': true, 'danger': errors.has('password') }" required>
        <div v-show="errors.has('password')" :title="errors.first('password')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input v-validate="'required|min:8'" type="password" name="password_confirm" placeholder="Confirm password" :class="{'input': true, 'danger': errors.has('password_confirm') }" required>
        <div v-show="errors.has('password_confirm')" :title="errors.first('password_confirm')" class="form__x">&times;</div>
      </div>

    	<button type="submit" class="submit">Sign up</button>
      <div class="form__terms"><span class="form__span">By signing up, you agree to our </span> <span class="form__span form__span-bold">Terms & Privacy Policy</span></div>
    </form>

</template>

<script>
export default {
	name: 'SignUp',
  }
</script>
