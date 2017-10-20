<template lang="html">
	<router-view>
		<Footer></Footer>
	</router-view>
</template>

<script>
	import Footer from './Footer.vue';
	export default{
		components:{Footer}
	}
</script>
