import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
import {SALT_FACTOR} from '../config';

/*
  EXPONER
  Crateristicas
  requerimentos  ventajas y desventajas
*/


const UserSchema=new Schema({
  first_name:{type:String, required:true},
  last_name:{type:String, required:true},
  email:{type:String, unique:true, required:true},
  password:{type:String, required:true}
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



UserSchema.methods.comaprePassword=function(password,cb) {
  bcrypt.compare(password,this.password,(err,isMatch)=>{
    if(err) return cb(err);
    cb(null,isMatch)
  });
};


export default mongoose.model('User',UserSchema);
