<template lang="html">
	<section class="container">
		<p class="title">Photograph</p>
		<SignIn v-if="sign_in" ></SignIn>
		<SignUp v-if="sign_up"></SignUp>

		<div class="forms">
			<p>{{message}}</p>
			<p v-if="sign_in" v-on:click="show_signup();">{{tipo_form}}</p>
			<p v-if="sign_up" v-on:click="show_signin();">{{tipo_form}}</p>
		</div>

	</section>
</template>

<script>
import SignUp from './SignUp.vue';
import SignIn from './SignIn.vue';

export default {
	name: 'login',
	components: { SignUp, SignIn },
	methods:{
		show_signup: function() {
			this.sign_up = true;
			this.sign_in = false;
			this.message = '¿Tienes una cuenta?';
			this.tipo_form = 'Entrar';
		},
		show_signin: function() {
			this.sign_up = false;
			this.sign_in = true;
			this.message = '¿No tienes una cuenta?';
			this.tipo_form = 'Registrate';
		}
	},
	data () {
		return {
			sign_up: false,
			sign_in: true,
			tipo_form: 'Registrate',
			message: '¿No tienes una cuenta?'
		}
	},
}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Allura|Arizonia|Calligraffitti|Caveat:400,700|Clicker+Script|Cookie|Courgette|Great+Vibes|La+Belle+Aurore|Marck+Script|Nothing+You+Could+Do|Parisienne|Pinyon+Script|Qwigley|Rochester|Sacramento|Shadows+Into+Light|Shadows+Into+Light+Two|Tangerine:400,700');

	.container{
		width: 350px;
		height: auto;
		padding: 10px 20px;
		border: 1px solid lightgray;
		margin: auto;

		display: flex;
		flex-direction: column;
		align-items: center;

		.title{
			font-family: 'Satisfy';
			font-size: 30px;
			border-bottom: 1px solid lightgray;
			width: 100%;
			text-align: center;
			padding-bottom: 15px;
			color: #F85252;
		}
	}
	.forms{
		margin: 20px 0;
		border-top: 1px solid lightgray;
		padding-top: 15px;
		width: 100%;
		text-align: center;

		p{
			display: inline;
			font-family: 'Caveat', 'La belle aurore', 'Nothing you could do';
			font-size: 25px;
		}

		p:last-child{
			color: #F85252;
		}
	}
</style>