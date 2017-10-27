<template >
	<section class="profile-box">

		<!--
		<router-link to="/profile/edit" class="edit-icon">
			<figure>
				<img src="/client/assets/settings.svg">
			</figure>
		</router-link>
		-->

		<router-link to="/profile/edit" class="edit-icon">
			<div class="icon icon-params"></div>
		</router-link>

		<figure>
			<img :src="profile_img">
			<figcaption>@{{username}}</figcaption>
		</figure>

		<p>{{name}} {{last_name}}</p>

		<pre>
			Biografia
		</pre>

		<div class="more-about-user">
			<div>
				<p>{{posts.length}}</p>
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
			last_name: this.$store.state.user.last_name,
			username:this.$store.state.user.username,
			profile_img:this.$store.state.user.profile_img,
			posts: this.$store.state.user.posts
		}
	}
}
</script>
