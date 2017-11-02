import User from '../models/user';
import Post from '../models/post';
import Profile from '../models/profile';
import Friendship from '../models/friendship';

import {createToken} from '../../services/index';
import fs from 'fs';
import mongoose from 'mongoose';

export const followController=(req,res)=>{
  console.log(req.body);
  User.findOne({_id:req.body._user})
  .populate('following')
  .exec((e,u)=>{
      if(e) return res.status(500).send('Server error');
      let isExist= u.following.filter( u => u.user == req.body.user);
      console.log(isExist);
      if(isExist.length === 0 ){
        let friendship=new Friendship({
          user:req.body.user
        });
        friendship.save();
        u.following.push(friendship._id);
        u.save();
        res.status(200).send(friendship);
        console.log(":D");
      }else{
        console.log(":()");
      }

  });
};

export const updateUser=(req,res)=>{
  let user=req.params.id, {gender,username,first_name,last_name,email}=req.body;
  Profile.findOneAndUpdate({user},{username,gender},(e,p)=>{
    if(e) return res.status(500).send('Server error');
    User.findOneAndUpdate({_id:user},{first_name,last_name,email},(e,u)=>{
      if(e) return res.status(500).send('Server error');
      return res.status(200).send(username);
    })
  });
};


export const testController=(req,res)=>{
  //59efd054737e72563d4c337e
  //59efd0bbc741165833f0b192

  //59efd1488263b759f4745f1f

  Profile.find()
  .populate({
    path:'user',
    populate:{path:'following'}
  })
  .exec((e,u)=>{
      if(e) return res.status(500).send('Server error');
      res.send(u);

  });

}

export const searchController=(req,res)=>{
  let username=req.params.username;
  Profile.find({username:new RegExp(`^${username}`,"i")},' username profile_img')
  .populate({
      path:'user',
      select:'_id'

  })
  .exec((e,u)=>{
    res.send(u || 'no users');
  })
}





export const  getUsers=(req,res)=>{
  Profile.find()
  .populate('user')
  .exec((e,u)=>{

  });
}


export const getAllPosts=(req,res)=>{
  const id=req.params.id
  User.findOne({_id:id})
  .populate('posts','-__v')
  .exec((e,p)=>{
    if(e) return res.status(500).send(`Server error ${e}`);
    return res.status(200).send(p.posts);
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
      caption: req.body.caption,
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


//GET USER
export const getCurrentUser=(req,res)=>{
  let isValid = require('mongoose').Types.ObjectId.isValid;
  const id= req.params.id

  Profile.findOne({$or:[{user:isValid(id) ? id:null},{username:id}]})
  .populate({
    path:'user',
    populate:{path:'posts'},
    populate:{
      path:'following',
      match:{
        isPending:false
      }
    }
  })
  .exec((e,u)=>{
      if(e) return res.status(500).send('Server error');
      if(!u) return res.status(400).send('Error your user not exist');
      let {first_name,last_name,email,_id,posts,following,followers} = u.user,
      {profile_img,username,gender}=u;
      console.log(gender);
      res.status(200).send({user:{gender,following,followers,username,profile_img,_id,first_name,last_name,email,posts}})

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
        let {username,profile_img,gender}=profile;
        return res.status(200).send({user:{_id,gender,username,profile_img,first_name,last_name,email,posts},token:createToken(user)});
      });
    }

  });

}
