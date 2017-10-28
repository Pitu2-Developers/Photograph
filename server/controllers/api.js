import User from '../models/user';
import Post from '../models/post';
import Profile from '../models/profile';
import Friendship from '../models/friendship';

import {createToken} from '../../services/index';
import fs from 'fs';
import mongoose from 'mongoose';

export const followController=(req,res)=>{
  console.log(req.body);
  User.findOne({_id:req.body._user},(e,u)=>{
    if(e) return res.status(500).send('Server error');

    if(!u.following.includes(req.body.user)){
      let friendship=new Friendship({
        user:req.body.user
      })
      console.log(":D");
    }else{
      console.log(":()");
    }
    // friendship.save((e)=>{
    //   if(e) return res.status(500).send('Server error');
    //   return res.status(200).send('Requested')
    // });


  })
};

export const updateUser=(req,res)=>{
  let user=req.params.id
  Profile.findOne({user})
  .populate('user')
  .exec((e,u)=>{
    if(!e) return res.status(500).send('Server error');
    if(!u) return res.status(403).send('User doesn\'t exist');
    else{
      let {first_name,last_name,email,username}=req.body;

      u.username=username != u.username && username != ''? username:u.username;
      u.user.first_name=first_name != u.user.first_name && first_name!=''? first_name:u.user.first_name;
      u.user.last_name=last_name != u.user.last_name && last_name!=''? last_name:u.user.last_name;
      u.user.email= email != u.user.email && email!=''? email:u.user.email;

      u.save();
      u.user.save();
      return res.status(200).send('Updated successfully');
    }
  });
};


export const testController=(req,res)=>{
  //59efd054737e72563d4c337e
  //59efd0bbc741165833f0b192

  //59efd1488263b759f4745f1f

  Profile.find({})
  .populate({
    path:'user',
    populate:{path:'posts'}
  })
  .exec((e,u)=>{
    let a= u[1].user.following.reduce((array,i,index)=>{
      if(i == '59efd1488263b759f4745f1f'){
        array.pop(index)
      }
      return array
    },[])
    console.log(a);
    return res.send(u)
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

  console.log(`${id}-${isValid(id)}`);
  Profile.findOne({$or:[{user:isValid(id) ? id:null},{username:id}]})
  .populate({
    path:'user',
    populate:{path:'posts'}
  })
  .exec((e,u)=>{
      if(e) return res.status(500).send('Server error');
      if(!u) return res.status(400).send('Error your user not exist');
      console.log(u.user);
      let {first_name,last_name,email,_id,posts,following,followers} = u.user,
      {profile_img,username}=u;
      res.status(200).send({user:{following,followers,username,profile_img,_id,first_name,last_name,email,posts}})

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
