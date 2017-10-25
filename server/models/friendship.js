import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FriendshipSchema=new Schema({
    isPending:{type:Boolean,default:true},
    user:{type:Schema.ObjectId,ref:'User'},
});


export default mongoose.model('Friendship',FriendshipSchema);
