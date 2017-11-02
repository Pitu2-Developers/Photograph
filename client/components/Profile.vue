<template>
	<section class="profile-box">
		<div class="profile-info">
			<ProfileInfo v-if="!isLoading" :user="user"></ProfileInfo>
			<button v-if="user.username != currentUser " @click="follow()" type="button" name="button">Follow</button>

			<div class="layout-icon">
				<div v-show="!showSome" @click="show_some()" class="icon icon-toggle-off"></div>
				<div v-show="!showByOne" @click="show_one()" class="icon icon-toggle-on"></div>
			</div>
		</div>
		<ProfileContent v-if="!isLoading" :posts="user.posts" class="profile-content" :class="{'show-some': showSome, 'show-by-one': showByOne}"></ProfileContent>
	</section>
</template>

<script>
import ProfileInfo from './ProfileInfo.vue';
import ProfileContent from './ProfileContent.vue';

export default {
	components: {ProfileInfo, ProfileContent},
	mounted(){
		this.fetchData()
	},
	data () {
		return {
			showSome: true,
			showByOne: false,
			user:{},
			currentUser:this.$store.state.user.username,
			isLoading:true
		}
	},
	watch:{
		'$route':'fetchData'
	},
	methods: {
		show_some(){
			this.showSome = true;
			this.showByOne = false;
		},
		show_one(){
			this.showSome = false;
			this.showByOne = true;
		},
		fetchData(){
			this.isLoading=true;
			this.$store.dispatch('getUser',this.$route.params.username)
			.then(response=>{
				this.user=response;
				this.isLoading=false ;

				console.log(this.user);
			})
			.catch(err=>{
				console.log(this.$store.state.user.username);
				this.$router.push('/')

				// console.log(this.$router.push({path:'home'}));
			});
		}
		,
		follow(){
			this.$store.dispatch('follow',{_user:this.$store.state.user._id,user:this.user._id});
		}

	}
}
</script>
