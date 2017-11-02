import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import avatar from 'cartoon-avatar';
import moment from 'moment';

const ProfileSchema=new Schema({
  username:{
    type:String,
    required:true,
  },
  profile_img:{type:String},
  user:{type:Schema.ObjectId,ref:'User',required:true},
  gender:{type:String,enum:['M','F'],default:'M'},
  isPrivate:{type:Boolean,default:false},
  created_at:{type:String, default:moment().format() },
  // isNew:{type:Boolean, default:true}
});

ProfileSchema.pre('save',function(next){

  if(!this.isModified('username')) return next();
  // this.username+=(Math.floor(Math.random()*94)+1)*Math.floor(Math.random()*33)+1
  this.profile_img=avatar.generate_avatar();
  next();
});

export default mongoose.model('Profile',ProfileSchema);
