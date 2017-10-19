import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
import {SALT_FACTOR} from '../config';
import moment from 'moment';

const UserSchema=new Schema({
  first_name:{type:String, required:true},

  last_name:{type:String, required:true},

  email:{type:String, unique:true, required:true},

  password:{type:String, required:true},

  created_at:{type:String, default:moment().format()},
<<<<<<< HEAD

  posts:[{type:Schema.ObjectId,ref:'Post'}],

  friends:[{type:Schema.ObjectId,ref:'User'}]

=======
  posts:[{type:Schema.ObjectId,ref:'Post'}],
  friends:[{type:Schema.ObjectId,ref:'User'}]
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
});




UserSchema.pre('save',function (next) {

  let user=this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR,(err,salt)=>{
      if(err) return next(err);

      bcrypt.hash(user.password,salt,(err,hash)=>{
        if(err) return next(err);

        user.password=hash;

        next();
      });

  });

});


//
UserSchema.methods.comparePassword=function(password) {
  return bcrypt.compareSync(password,this.password);
};


export default mongoose.model('User',UserSchema);
