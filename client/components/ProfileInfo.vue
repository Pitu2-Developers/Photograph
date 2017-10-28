<template >
	<section class="profile-box">
		<router-link to="/profile/edit" class="edit-icon">
			<figure>
				<img src="/client/assets/settings.svg">
			</figure>
		</router-link>

		<figure>
			<img :src="user.profile_img">
			<figcaption>@{{user.username}}</figcaption>
		</figure>

		<p>{{user.first_name}} {{user.last_name}}</p>

		<pre>
			Biografia
		</pre>

		<div class="more-about-user">
			<div>
				<p>{{user.posts.length}}</p>
				<p>Posts</p>
			</div>
			<div>
				<p>{{user.followers.length}}</p>
				<p>Followers</p>
			</div>
			<div>
				<p>{{user.following.length}}</p>
				<p>Following</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props:['user'],
}
</script>
