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
    },
    populate:{
      path:'posts', select:'-__v -_creator',
    },
    populate:{
      path:'following', select:'-__v',
      match:{
        isPending:true
      }
    }
  })
  .exec((e,u)=>{
    // u=u.filter((u)=>u.user != null);
    let user=u.filter(u=>u.user !=null)[0];
    if(e) return res.status(500).send(`Server error ${e}`);
    if(!user) return res.status(403).send({text:'Email doesn\'t match any account'});
    if(user.user.comparePassword(password)){
      let {_id,first_name,last_name,email,posts,following}=user.user;

        res.status(200).send({
          user:{
            _id,
            first_name,
            last_name,
            email,
            username:user.username,
            profile_img:user.profile_img,
            gender:user.gender,
            posts,
            following
          },
          token:createToken(user.user._id)
      });
    }
    else return res.status(400).send({text:'The password you\'ve entered is incorrect'});
  });


}; // End SignIn function
