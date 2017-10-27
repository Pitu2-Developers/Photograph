<template>
	<section class="profile-box">
		<div class="profile-info">
			<ProfileInfo></ProfileInfo>
			
			<div class="layout">
				<p>Lista</p>

				<div class="layout-icon">
					<div v-show="!showSome" @click="show_some()" class="icon icon-toggle-off"></div>
					<div v-show="!showByOne" @click="show_one()" class="icon icon-toggle-on"></div>
				</div>

				<p>Cuadricula</p>
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
	mounted(){
		console.log("MOUNTED");

	},
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
