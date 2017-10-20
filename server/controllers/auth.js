import User from '../models/user';
import Profile from '../models/profile';
import {createToken} from '../../services/index';



export const SignIn =(req,res)=>{
  let {email,password} = req.body;

  Profile.find()
  .populate({
    path:'user',
    match:{
      email
    }
  })
  .exec((e,u)=>{
    // u=u.filter((u)=>u.user != null);
    let user=u.filter(u=>u.user !=null)[0];
    if(e) return res.status(500).send(`Server error ${e}`);
    if(!user) return res.status(403).send({text:'Email doesn\'t match any account'});
    if(user.user.comparePassword(password)){
      let {_id,first_name,last_name,email}=user.user;
        res.status(200).send({
          user:{
            _id,
            first_name,
            last_name,
            email,
            username:user.username,
            profile_img:user.profile_img
          },
          token:createToken(user.user._id)
      });
    }
    else return res.status(400).send({text:'The password you\'ve entered is incorrect'});
  });

  // User.findOne({email:email}, (err,user)=>{
  //   // The server encountered an error  500
  //   if(err) return res.status(500).send(`Server error ${err}`);
  //   //
  //   if(!user) return res.status(403).send({text:'Email doesn\'t match any account',type:'email'});
  //   //compare password true: send token
  //   if(user.comparePassword(password)){
  //     let {first_name,last_name,email,_id}=user;
  //     return res.status(200).send({user:{_id,first_name,last_name,email},token:createToken(user)});
  //   }
  //   // false: send a message => response.data.text and error type
  //   else return res.status(400).send({text:'The password you\'ve entered is incorrect', type:'password'});
  //
  // }); // End User.findOne
  //


}; // End SignIn function
