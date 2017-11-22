<template >
	<section class="profile-box">

		<router-link v-if="user.profile.username === currentUser" to="/profile/edit" class="edit-icon">
			<div class="icon icon-params"></div>
		</router-link>

		<figure>
			<img :src="user.profile.profile_img">
			<figcaption>@{{user.profile.username}}</figcaption>
		</figure>

		<p>{{user.first_name}} {{user.last_name}}</p>

		<pre>
			Biografia
		</pre>

		<div  class="more-about-user">
			<div>
				<p>{{user.profile.posts.length}}</p>
				<p>Posts</p>
			</div>
			<div>
				<p>{{user.profile.followers.length}}</p>
				<p>Followers</p>
			</div>
			<div>
				<p>{{user.profile.following.filter(f=>!f.isPending).length}}</p>
				<p>Following</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props:['user'],
	data(){
		return{
			currentUser:this.$store.state.user.profile.username
		}
	}
}
</script>
