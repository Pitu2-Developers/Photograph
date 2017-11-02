<template>
	<section>
		<figure v-for="image in images">
			<img @click="change_image(image)" :src="image">
		</figure>
	</section>
</template>

<script>


	export default{
		props:['images'],
		data () {
			return{
				user: this.$store.state.user,
			}
		},
		methods: {
			change_image(src){
				this.user.profile_img = src;
			}
		}
	}
</script>
