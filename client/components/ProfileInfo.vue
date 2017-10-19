<template >
	<section class="profile-box">
		<router-link to="/profile/edit" class="edit-icon">
			<figure>
				<img src="/client/assets/settings.svg">
			</figure>
		</router-link>

		<figure>
			<img src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png">
			<figcaption>@Nombre_de_usuario</figcaption>
		</figure>

		<p>{{name}} {{last_name}}</p>
		
		<pre>
			Biografia
		</pre>

		<div class="more-about-user">
			<div>
				<p>1</p>
				<p>Posts</p>
			</div>
			<div>
				<p>0</p>
				<p>Followers</p>
			</div>
			<div>
				<p>0</p>
				<p>Following</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data () {
		return{
			name: this.$store.state.user.first_name,
			last_name: this.$store.state.user.last_name
		}
	}
}
</script>
