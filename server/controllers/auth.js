import User from '../models/user';
import Profile from '../models/profile';
import {createToken} from '../../services/index';



export const SignIn =(req,res)=>{
  let {email,password} = req.body;

  User.findOne({email},'-__v -created_at')
  .populate({
      path:'profile',
      select:'-__v -created_at',
      populate:{
        path:' following posts followers',
        select:'-__v -_creator'
      },
  })
  .exec((e,u)=>{
    if(e) return res.status(500).send(`Server error ${e}`);

    if(!u) return res.status(403).send({text:'Email doesn\'t match any account'});

    if(u.comparePassword(password)){
      let {_id,first_name,last_name,email,posts,profile}=u;
        res.setHeader('Authorization',`Bearer ${createToken(u._id)}`);
        res.status(200).send({
          user:{
            _id,
            first_name,
            last_name,
            email,
            profile
          },
          token:createToken(u._id)
      });
    }
    else return res.status(400).send({text:'The password you\'ve entered is incorrect'});
  });


}; // End SignIn function
