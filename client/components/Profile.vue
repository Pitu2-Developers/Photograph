<template>
	<section class="profile-box">
		<div class="profile-info">
			<ProfileInfo v-if="!isLoading" :user="user"></ProfileInfo>
			<!-- !isLoading && user.profile.username != currentUser  &&  -->
			<button class="btn btn__follow" v-if="!isLoading && user.profile.username != currentUser && (!isRequested.requested && !isRequested.isPending) " @click="follow()" type="button" name="button">Follow</button>
			<button class="btn btn__follow" v-else-if="!isLoading && user.profile.username != currentUser && (isRequested.requested && isRequested.isPending)" @click="cancel()" type="button" name="button">Requested</button>
			<button class="btn btn__follow" v-else-if="!isLoading && user.profile.username != currentUser && (isRequested.requested && !isRequested.isPending)" type="button" name="button">Following</button>

			<div class="layout-icon">
				<div v-show="!showSome" @click="show_some()" class="icon icon-toggle-off"></div>
				<div v-show="!showByOne" @click="show_one()" class="icon icon-toggle-on"></div>
			</div>
		</div>
		<ProfileContent v-if="!isLoading && !user.profile.isPrivate" :posts="user.profile.posts"  :class="{'profile-content':true, 'show-some': showSome, 'show-by-one': showByOne}"></ProfileContent>
		<section class="profile-content" v-else=""><h1>Is Private</h1></section>
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
			currentUser:this.$store.state.user.profile.username,
			isLoading:true,
		}
	},
	sockets:{
		follow(data){
			console.log("FOLLOW");
		}
	},
	computed:{
		isRequested(){
			let res= this.$store.state.user.profile.following.filter(f=>{
				return f.user === this.user._id
			})[0];


			let obj=this.$store.state.user.profile.following.find(o => o.user == this.user._id);

			return res  && res.isPending ? {requested:true, isPending:res.isPending}:{requested:res ? true:false,isPending:res?res.isPending:false}
		}
	},
	watch:{
		'$route':'fetchData',
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
				this.isLoading=false;

				// console.log(this.user);
			})
			.catch(err=>{
				this.$router.push('/')

				// console.log(this.$router.push({path:'home'}));
			});
		}
		,
		follow(){
			this.$store.dispatch('follow',{_user:this.$store.state.user._id,user:this.user._id})
			.then(response=>{
				let {following,follower}=response;
				this.$socket.emit('followRequest',{following:following._id,follower:follower._id,_id:this.user._id,profile_img:this.$store.state.user.profile.profile_img,first_name:this.$store.state.user.first_name,last_name:this.$store.state.user.last_name,username:this.$store.state.user.profile.username});
			})
		},
		cancel(){
			this.$store.state.user.profile.following.forEach((e,i,a)=>{
				if(e.user === this.user._id){
					this.$store.dispatch('cancel',{data:e,index:i,user:this.user.profile._id,_user:this.$store.state.user._id})
					.then(()=>{
						console.log("2");
						this.$socket.emit('getNotifications',{_id:this.$store.state.user.profile._id,to:this.user._id});
					});
				}
			});
		}

	}
}
</script>
