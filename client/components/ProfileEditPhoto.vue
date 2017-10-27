<template>
	<section>
		<figure v-for="image in images">
			<img @click="change_image(image)" :src="image">
		</figure>
	</section>
</template>

<script>
	import avatar from 'cartoon-avatar';
	var images = [];

	for(var i=1 ; i <= 28 ; i++){
		images.push(avatar.generate_avatar({"gender": "male", "id": i}));
	}

	console.log(images);

	export default{
		data () {
			return{
				user: this.$store.state.user,
				images
			}
		},
		methods: {
			change_image(src){
				this.user.profile_img = src;
			}
		}
	}
</script>