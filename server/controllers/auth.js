import User from '../models/user';
import {createToken} from '../../services/index';



export const SignIn =(req,res)=>{
  let {email,password} = req.body;

  User.findOne({email:email}, (err,user)=>{
    // The server encountered an error  500
    if(err) return res.status(500).send(`Server error ${err}`);
    //
    if(!user) return res.status(403).send({text:'Email doesn\'t match any account',type:'email'});
    //compare password true: send token
    if(user.comparePassword(password)){
<<<<<<< HEAD
      let {first_name,last_name,email,_id}=user;
      console.log(_id);
      return res.status(200).send({user:{_id,first_name,last_name,email},token:createToken(user)});
=======
      let {first_name,last_name,email}=user;
      return res.status(200).send({user:{first_name,last_name,email},token:createToken(user)});
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
    }
    // false: send a message => response.data.text and error type
    else return res.status(400).send({text:'The password you\'ve entered is incorrect', type:'password'});

  }); // End User.findOne



}; // End SignIn function
