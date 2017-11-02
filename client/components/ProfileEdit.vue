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

				<transition name="editing-avatar">
					<ProfileEditPhoto :images="images" v-show="edit_picture" class="avatar-pictures"></ProfileEditPhoto>
				</transition>
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
					<select v-model="user.gender" class="input select" name="gender">
						<option selected value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>

				<div class="form__field">
					Email:
					<input v-model="user.email" v-validate="'email'" :class="{'input': true, 'danger': errors.has('email') }" name="email" type="text" placeholder="Email" required>
        			<div v-show="errors.has('email')" :title="errors.first('email')" class="form__x">&times;</div>
				</div>

			</form>

			<div class="profile-edit-buttons">
				<!-- Regresa al perfil y guarda los cambios -->
				<a @click="updateProfile()" class="button">Guardar</a>
				<!-- Regresa al perfil -->
				<router-link class="button" to="/profile">Cancelar</router-link>
			</div>
		</article>
	</section>
</template>

<script>
	import ProfileEditPhoto from './ProfileEditPhoto.vue';
	import avatar from 'cartoon-avatar';

	export default{
		components: {ProfileEditPhoto},
		data () {
			return {
				user: this.$store.state.user,
				edit_picture: false,
				images:[]
			}
		},
		methods: {
			editing_enabled(){
				this.edit_picture = !this.edit_picture;
				if(this.edit_picture){
					for(var i=1 ; i <= 28 ; i++){
						this.images.push(avatar.generate_avatar({"gender": this.$store.state.user.gender, "id": i}));
					}
				}


			},
			updateProfile(){
				console.log('USER');
				console.log(this.user);
				this.$store.dispatch('update',this.user).
				then(response=>{
					console.log(`response ${response}`);
					this.$router.push({name:'profile',params:{username:response}});
				});
				// .then((response)=>{
				// 	console.log(response);
				// 	this.$router.push({name:'profile',params:{username:response}});
				// });
			}
		}
	}
</script>
