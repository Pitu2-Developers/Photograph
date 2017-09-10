import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import moment from 'moment';


const PostSchema= new Schema({
  description:{type:String},
  img:{type:String, required:true},
  created_at:{type:String , default:moment().format()},
  _creator:{type:Schema.ObjectId, ref:'User'}
});


export default mongoose.model('Post',PostSchema);
