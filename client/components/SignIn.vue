<template lang="html">

    <form method="post" accept-charset="utf-8" class="signin-form">

    	<input type="text" name="user" placeholder="User" required>

    	<input type="password" name="password" placeholder="Password" required>

    	<button type="submit" class="btn">Entrar!</button>

    </form>

</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
	name: 'SignIn'
}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Open+Sans:300|Satisfy');
	@import url('https://fonts.googleapis.com/css?family=Allura|Arizonia|Calligraffitti|Caveat:400,700|Clicker+Script|Cookie|Courgette|Great+Vibes|La+Belle+Aurore|Marck+Script|Nothing+You+Could+Do|Parisienne|Pinyon+Script|Qwigley|Rochester|Sacramento|Shadows+Into+Light|Shadows+Into+Light+Two|Tangerine:400,700');

	.signin-form{
		display: flex;
		flex-direction: column;
		width: 100%;

		input{
			border-radius: 5px;
			border: 1px solid lightgray;
			color: black;
			font-family: 'Open sans';
			font-size: 16px;
			height: 30px;
			margin-bottom: 15px;
			text-align: center;
		}

	}
	.btn{
		background-color: #F85252;
		border-radius: 5px;
		border: none;
		color: white;
		font-family: 'Lobster';
		font-size: 20px;
		height: 30px;
	}
</style>
