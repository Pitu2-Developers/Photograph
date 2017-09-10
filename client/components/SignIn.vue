<template lang="html">

    <form accept-charset="utf-8" class="signin-form">
      <div class="form__field">
        <input class="input" type="email" name="email" placeholder="Email" v-validate="'required'">
        <div v-show="errors.has('email')" :title="errors.first('email')" class="form__x">&times;</div>
      </div>

      <div class="form__field">
        <input class="input" type="password" name="password" placeholder="Password" v-validate="'required'">
        <div v-show="errors.has('password')" :title="errors.first('password')" class="form__x">&times;</div>
      </div>

    	<button  type="submit" class="submit">Sign in</button>

    </form>

</template>

<script>
export default {
	name: 'SignIn'
}
</script>
