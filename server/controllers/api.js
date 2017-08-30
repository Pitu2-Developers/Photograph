import User from '../models/user';

export const testController=(req,res)=>{
  User.find({},(err,users)=>{
    res.status(200).json(users);
  });
}


export const createUser=(req,res)=>{
  const {first_name,last_name,email,password,confirmPassword}=req.body;
    console.log(first_name);
  let user=new User({
    first_name:first_name,
    last_name:last_name,
    email:email,
    password:password
  });

  user.save((err,u)=>{
    if(err) res.status(500).send(err);
    res.status(200).end();
  });
}
