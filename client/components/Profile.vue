<template >
	<section class="profile-box">
		<div class="profile-info">
			<ProfileInfo></ProfileInfo>
			
			<div class="type-layout">
				<img v-bind:class="{'option-selected': !showSome}" @click="show_one()" src="/client/assets/list-unordered.svg">
				<img v-bind:class="{'option-selected': !showByOne}" @click="show_some()" src="/client/assets/kebab-horizontal.svg">
			</div>
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

