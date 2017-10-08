import User from '../models/user';
import Post from '../models/post';
import {createToken} from '../../services/index';
// import {User,Post} from '../models/models';

export const testController=(req,res)=>{
  console.log(req.headers);
  res.status(200).send(req.headers)

}


export const createUser=(req,res)=>{
  let {first_name,last_name,email,password,confirmPassword} = req.body;

  User.findOne({'email':email},(err,u)=>{
    //Server error
    if(err){
      console.log("HOLA");
      return res.status(500).send(err);
    }

    // if user exist send error message
    if(u) return res.status(400).send(`User already exists`);
    else{
      let user=new User({
        email,
        password,
        first_name,
        last_name,
      });

      user.save(err=>{
        if(err) return res.status(500).send(err);
        let {first_name,last_name,email} = user;
        return res.status(200).send({user:{first_name,last_name,email},token:createToken(user)});
      });
    }

  });

}
