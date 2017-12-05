import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FriendshipSchema=new Schema({
    seen:{type:Boolean,default:false},
    isPending:{type:Boolean,default:true},
    user:{type:Schema.ObjectId,ref:'User'},
    uuid:{type:Schema.ObjectId},
    requestType:{type:String,enum:['FOLLOWING','FOLLOWER'],default:'FOLLOWING'},
});


export default mongoose.model('Friendship',FriendshipSchema);
