import User from '../models/user';
import Post from '../models/post';
import Profile from '../models/profile';

import {createToken} from '../../services/index';
import fs from 'fs';


export const getAllPosts=(req,res)=>{
  const id=req.params.id
  User.findOne({_id:id})
  .populate('posts','-__v')
  .exec((e,p)=>{
    if(e) return res.status(500).send(`Server error ${e}`);
    return res.status(200).send(p);
  });
};


export const uploadController=(req,res,next)=>{

  User.findOne({_id:req.body.user},(e,u)=>{
    if(e) return res.status(500).send('Server error');
    if(!u) return res.status(404).send('User doesn\'t exist');

    const path=`${req.file.destination}/${req.body.user}`,
          source=fs.createReadStream(`${req.file.destination}/${req.file.filename}`);
    if(!fs.existsSync(path)){
      fs.mkdirSync(path);
    }

    const dest=fs.createWriteStream(`${path}/${req.file.filename}`);
    source.pipe(dest);
    source.on('end',()=>{
      fs.unlinkSync(`${req.file.destination}/${req.file.filename}`);
    });
    source.on('error',e=>{
      console.log(e);
    });
    console.log(req.body);
    const post=new Post({
      caption:req.body.caption,
      img:`http://localhost:8000/uploads/${req.body.user}/${req.file.filename}`,
      _creator:req.body.user
    });

    post.save(e=>{
      if(e) return res.status(500).send('Server error');
      u.posts.push(post._id);
      u.save(e=>{
        if(e) return res.status(500).send('Server error');
        return res.status(200).send('Uploaded successfully')
      });
    });
  });


}


export const testController=(req,res)=>{
  //59ebdc8b4286f24a073ad6fb
  //59ebdcd7924b004cb92aa8e7
  User.findOne()
  .populate()
  .exec((e,u)=>{
    res.send(u);
  })

}


//GET USER
export const getCurrentUser=(req,res)=>{
  const id= req.params.id

  Profile.findOne({user:id})
  .populate({
    path:'user',
    populate:{path:'posts'}
  })
  .exec((e,u)=>{
      if(e) res.status(500).send('Server error');
      if(!u) res.status(400).send('Error your user not exist');
      let {first_name,last_name,email,_id,posts} = u.user,
      {profile_img,username}=u;
      res.status(200).send({user:{username,profile_img,_id,first_name,last_name,email,posts}})

  });
};
///


export const createUser=(req,res)=>{
  let {first_name,last_name,email,password,confirmPassword} = req.body;

  User.findOne({'email':email},(err,u)=>{
    //Server error
    if(err) return res.status(500).send(err);

    // if user exist send error message
    if(u) return res.status(400).send(`User already exists`);
    else{
      let user=new User({
        email,
        password,
        first_name,
        last_name,
      });
      let profile=new Profile({
        username:user.first_name.replace(/\s/g,''),
        user:user._id
      });

      profile.save(err=>{
        if(err) return res.status(500).send(err);
      });
      user.save(err=>{
        if(err) return res.status(500).send(err);
        let {first_name,last_name,email,_id,posts} = user;
        let {username,profile_img}=profile;
        return res.status(200).send({user:{_id,username,profile_img,first_name,last_name,email,posts},token:createToken(user)});
      });
    }

  });

}
