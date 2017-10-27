<template>
	<section class="profile-box">
		<article class="profile-edit">
			<h1>Profile Edit</h1>

			<div class="profile-picture">
				<div>
					<figure>
						<img :src="user.profile_img">
					</figure>
					<button v-show="!edit_picture" @click="editing_enabled()" class="button">Show Pictures</button>
					<button v-show="edit_picture" @click="editing_enabled()" class="button">Change Pincture!</button>
				</div>
				
				<ProfileEditPhoto v-show="edit_picture" class="avatar-pictures"></ProfileEditPhoto>
			</div>
			
			<form class="form-profile-edit">
				<div class="form__field">
					Username: 
					<input v-model="user.username" v-validate="'alpha_dash'" :class="{'input': true, 'danger': errors.has('username')}" name="username" type="text">
					<div v-show="errors.has('username')" :title="errors.first('username')" class="form__x">&times;</div>
				</div>

				<div class="form__field">
					First Name: 
					<input v-model="user.first_name" v-validate="'alpha_spaces'" :class="{'input': true, 'danger': errors.has('first_name')}" name="first_name" type="text">
					<div v-show="errors.has('first_name')" :title="errors.first('first_name')" class="form__x">&times;</div>
				</div>

				<div class="form__field">
					Last name: 
					<input v-model="user.last_name" v-validate="'alpha_spaces'" :class="{'input':true, 'danger': errors.has('last_name')}" name="last_name" type="text">
					<div v-show="errors.has('last_name')" :title="errors.first('last_name')" class="form__x">&times;</div>
				</div>

				<div class="form__field">
					Email: 
					<input v-model="user.email" v-validate="'email'" :class="{'input': true, 'danger': errors.has('email') }" name="email" type="text" placeholder="Email" required>
        			<div v-show="errors.has('email')" :title="errors.first('email')" class="form__x">&times;</div>
				</div>

			</form>

			<div class="profile-edit-buttons">
				<!-- Regresa al perfil y guarda los cambios -->
				<router-link to="/profile"><a class="button">Guardar</a></router-link>
				<!-- Regresa al perfil -->
				<router-link to="/profile"><a class="button">Cancelar</a></router-link>
			</div>
		</article>
	</section>
</template>

<script>
	import ProfileEditPhoto from './ProfileEditPhoto.vue';

	export default{
		components: {ProfileEditPhoto},
		data () {
			return {
				user: this.$store.state.user,
				edit_picture: false
			}
		},
		methods: {
			editing_enabled(){
				this.edit_picture = !this.edit_picture;
			}
		}
	}
</script>