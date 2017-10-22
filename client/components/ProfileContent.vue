<template>
	<section v-if="posts.length>0">
		<!-- Preview photos  -->
		<figure v-for="post in posts ">
			<img :src="post.img" :alt="post.caption">
			<figcaption>{{post.caption}}</figcaption>
		</figure>
	</section>
	<h3 v-else="">No posts yet</h3>
</template>

<script>
	export default{
		data(){
			return{
				posts:this.$store.state.user.posts
			}
		}
	}
</script>
