import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import avatar from 'cartoon-avatar';

const ProfileSchema=new Schema({
  username:{type:String, required:true, unique:true},
  profile_img:{type:String},
  user:{type:Schema.ObjectId,ref:'User',required:true},
  isPrivate:{type:Boolean,default:false}
});

ProfileSchema.pre('save',function(next){
  this.username+=(Math.floor(Math.random()*98234)+1)*Math.floor(Math.random()*33)+1
  this.profile_img=avatar.generate_avatar();
  next();
});

export default mongoose.model('Profile',ProfileSchema);
