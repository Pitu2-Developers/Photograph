<template lang="html">
	<div >
		<main class="container main-index center">
			<section class="form">
				<div class="form__header">
					<p class="title">Photograph</p>
					<span v-show='sign_up' class="form__info">
						Sign up to see photos from your friends.
					</span>
				</div>

				<SignIn v-show="sign_in" ></SignIn>
				<SignUp v-show="sign_up"></SignUp>

				<div class="form__footer">
					<p>{{message}}</p>
					<p v-if="sign_in" @click="show_signup();">{{tipo_form}}</p>
					<p v-if="sign_up" @click="show_signin();">{{tipo_form}}</p>
				</div>

			</section>
		</main>
		 <Footer></Footer>
	</div>
</template>

<script>
import SignUp from './SignUp.vue';
import SignIn from './SignIn.vue';
import Footer from './Footer.vue';
export default {
	name: 'login',
	components: { SignUp, SignIn, Footer },
	methods:{
		show_signup: function() {
			this.sign_up = true;
			this.sign_in = false;
			this.message = 'Have an account?';
			this.tipo_form = 'Sign in';
		},
		show_signin: function() {
			this.sign_up = false;
			this.sign_in = true;
			this.message = 'Don\'t have an account?';
			this.tipo_form = 'Sign up';
		}
	},
	data () {
		return {
			sign_up: false,
			sign_in: true,
			tipo_form: 'Sign up',
			message: 'Don\'t have an account?'
		}
	},
}
</script>
