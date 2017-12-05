<template>
	<section class="profile-box">
		<!-- <button @click="test()" type="button" name="button"></button> -->
		<div class="profile-info">
			<ProfileInfo v-if="!isLoading" :user="user"></ProfileInfo>
			<!-- !isLoading && user.profile.username != currentUser  &&  -->
			<button class="btn btn__follow" v-if="!isLoading && user.profile.username != currentUser && (!isRequested.requested && !isRequested.isPending) " @click="follow()" type="button" name="button">Follow</button>
			<button class="btn btn__follow" v-else-if="!isLoading && user.profile.username != currentUser && (isRequested.requested && isRequested.isPending)" @click="cancel(true)" type="button" name="button">Requested</button>
			<button class="btn btn__follow" v-else-if="!isLoading && user.profile.username != currentUser && (isRequested.requested && !isRequested.isPending)" @click="cancel(false)" type="button" name="button">Following</button>

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
import {mapGetters} from 'vuex';

export default {
	components: {ProfileInfo, ProfileContent},
	mounted(){
		this.fetchData()
		
		this.$store.dispatch('getFollows',this.$store.state.user.profile._id);
	},
	data () {
		return {
			showSome: true,
			showByOne: false,
			user:{},
			currentUser:this.$store.state.user.profile.username,
			isLoading:true,
			res:null,
			obj:null
		}
	},
	computed:{
		isRequested(){
			// let res= this.$store.state.user.profile.following.filter(f=>{
			// 	return f.user === this.user._id
			// })[0];
			console.log("IS REQUESTED");
			this.res= this.$store.state.user.profile.following.filter(f=>{
				return f.user === this.user._id
			})[0];

			console.log(this.res);

			this.obj=this.$store.state.user.profile.following.find(o => o.user == this.user._id);
			return this.res  && this.res.isPending ? {requested:true, isPending:this.res.isPending}:{requested:this.res ? true:false,isPending:this.res?this.res.isPending:false}
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
			})
			.catch(err=>{
				this.$router.push('/')
			});
		}
		,
		follow(){
			this.$store.dispatch('follow',{_user:this.$store.state.user._id,user:this.user._id})
			.then(response=>{
				let {following}=response;

				this.$socket.emit('followRequest',{uuid:following.uuid,following:following._id,_id:this.user._id,profile_img:this.$store.state.user.profile.profile_img,first_name:this.$store.state.user.first_name,last_name:this.$store.state.user.last_name,username:this.$store.state.user.profile.username});
			})
		},
		cancel(e){
			this.$store.state.user.profile.following.forEach((e,i,a)=>{
				if(e.user === this.user._id){
					this.$store.dispatch('cancel',{data:e,index:i,user:this.user.profile._id,_user:this.$store.state.user._id})
					.then(()=>{
						console.log(e);
						if(e) this.$socket.emit('getNotifications',{_id:this.$store.state.user.profile._id,to:this.user._id});
						else this.$socket.emit('getNotifications',{_id:this.$store.state.user.profile._id,to:null});
					});
				}
			});
		}

	}
}
</script>
