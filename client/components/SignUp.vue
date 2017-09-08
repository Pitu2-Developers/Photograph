<template lang="html">

    <form method="post" accept-charset="utf-8" class="registro">
    	
    	<input v-validate="{ rules: {email: true, required: true} }" :class="{'input': true, 'aviso': errors.has('email') }" name="email" type="text" placeholder="Email" required>
    	<span v-show="errors.has('email')" class="error"> {{errors.first('email')}} </span>

    	<input v-validate="{rules: {alpha_spaces: true, required: true} }" :class="{'input': true, 'aviso': errors.has('name') }" name="name" type="text" placeholder="Name" required>
    	<span v-show="errors.has('name')" class="error" > {{errors.first('name')}} </span>

    	<input v-validate="{ rules: {alpha_dash: true, required: true} }" :class="{'input': true, 'aviso': errors.has('user') }" type="text" name="user" placeholder="User"  required>
    	<span v-show="errors.has('user')" class="error">{{errors.first('user')}}</span>

    	<input v-validate="{ rules: {confirmed: 'password_confirm', required: true} }" type="password" name="password" placeholder="Password" :class="{'input': true, 'aviso': errors.has('password') }" required>
    	<span v-show="errors.has('password')" class="error">{{errors.first('password')}}</span>

    	<input v-validate="{ rules: {required: true} }" type="password" name="password_confirm" placeholder="Password" :class="{'input': true, 'aviso': errors.has('password_confirm') }" required>
    	<span v-show="errors.has('password_confirm')" class="error">{{errors.first('password_confirm')}}</span>

    	<button type="submit" class="btn-registro">Registrarse!</button>

    </form>

</template>

<script>
	import Vue from 'vue';
	import VeeValidate from 'vee-validate';

	Vue.use(VeeValidate);
export default {
	name: 'SignUp',
}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Open+Sans:300|Satisfy');

	.registro{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
	.error{
		font-size: 12px;
		color: #FF3722;
		margin: auto;
	}
	.input{
		margin-bottom: 15px;
		text-align: center;
		height: 30px;
		border-radius: 5px;
		border: 1px solid lightgray;
		font-family: 'Open sans';
		font-size: 16px;
		color: black;
	}
	.aviso{
		border: 1px solid red;
	}
	.btn-registro{
		height: 30px;
		border: none;
		border-radius: 5px;
		background-color: #F85252;
		color: white;
		font-family: 'Lobster';
		font-size: 18px;
	}
</style>