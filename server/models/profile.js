import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import avatar from 'cartoon-avatar';
import moment from 'moment';

const ProfileSchema=new Schema({
  username:{type:String,required:true},
  profile_img:{type:String},
  gender:{type:String,enum:['M','F'],default:'M'},
  isPrivate:{type:Boolean,default:false},
  created_at:{type:String, default:moment().format() },
  
  posts:[
    {type:Schema.ObjectId,ref:'Post'}
  ],


  followers:[
    {type:Schema.ObjectId,ref:'Friendship'}
  ],
  following:[{type:Schema.ObjectId,ref:'Friendship'}],

  isActive:{type:Boolean, default:false}
});

ProfileSchema.pre('save',function(next){
  if(!this.isModified('username')) return next();
  this.profile_img=avatar.generate_avatar();
  next();
});

export default mongoose.model('Profile',ProfileSchema);
