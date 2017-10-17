<template >
	<section class="profile-box">
		<ProfileInfo></ProfileInfo>
		
		<div class="type-layout">
			<img @click="show_one()" src="/client/assets/kebab-vertical.svg">
			<img @click="show_some()" src="/client/assets/kebab-horizontal.svg">
		</div>

		<ProfileContent class="profile-content" v-bind:class="{'show-some': showSome, 'show-by-one': showByOne}"></ProfileContent>
	</section>
</template>

<script>
import ProfileInfo from './ProfileInfo.vue';
import ProfileContent from './ProfileContent.vue';

export default {
	components: {ProfileInfo, ProfileContent},

	data () {
		return {
			showSome: true,
			showByOne: false
		}
	},

	methods: {
		show_some(){
			this.showSome = true;
			this.showByOne = false;
		},
		show_one(){
			this.showSome = false;
			this.showByOne = true;
		}
	}
}
</script>

