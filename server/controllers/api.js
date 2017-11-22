import User from '../models/user';
import Post from '../models/post';
import Profile from '../models/profile';
import Friendship from '../models/friendship';

import {createToken} from '../../services/index';
import fs from 'fs';
import mongoose from 'mongoose';


export const cancelFollowController=(req,res)=>{

  Friendship.findOneAndRemove({_id:req.body.data._id},(e,f)=>{
    console.log(f);
    return res.status(200).send({_id:f._id,index:req.body.index});
  })
};

export const followController=(req,res)=>{
  // console.log(req.body);
  User.findOne({_id:req.body._user})
  .populate({
    path:'profile',
    select:'following',
    populate:{
      path:'following'
    }
  })
  .exec((e,u)=>{
      // console.log(u.profile.following);
      if(e) return res.status(500).send('Server error');

      let isExist= u.profile.following.filter(f => f.user.equals(req.body.user));

      console.log(isExist);

      if(isExist.length === 0 ){
        let friendship=new Friendship({
          user:req.body.user
        });
        friendship.save();
        u.profile.following.push(friendship._id);
        console.log(u);
        u.profile.save();
        console.log(":D");
        return res.status(200).send(friendship);
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
  //59fb27a3d6c6a02c9cc3045a
  //JesusIgnacio
  let isValid = require('mongoose').Types.ObjectId.isValid;
  const id='JesusIgnacio'
  User.find({})
  .populate({
    path:'profile',
    populate:{
      path:'following followers post'
    }
  })
  .exec((e,u)=>{
    res.status(200).send(u);
  });

}


export const searchController=(req,res)=>{
  let username=req.params.username;

  User.find({},'first_name last_name profile')
  // Profile.find({username:new RegExp(`^${username}`,"i")},' username profile_img')
  .populate({
      path:'profile',
      match:{
        username:new RegExp(`^${username}`,"i")
      },
      select:'username profile_img',

  })
  .exec((e,u)=>{
    return res.status(200).send(u.filter(u=> u.profile!=null));
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

  User.findOne({_id:req.body.user})
  .populate({
    path:'profile',
  })
  .exec((e,u)=>{
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
      u.profile.posts.push(post._id);
      u.profile.save(e=>{
        if(e) return res.status(500).send('Server error');
        return res.status(200).send('Uploaded successfully')
      });
    });
  })


}


//GET USER
export const getCurrentUser=(req,res)=>{
  let isValid = require('mongoose').Types.ObjectId.isValid;
  const id= req.params.id

  User.find({},'-__v -password')
  .populate({
    path:'profile',
    select:'-__v',
    populate:{
      path:'following posts followers',
      select:'-__v',
    },
  })
  .exec((e,users)=>{
    if(e) return res.status(500).send('Server error');
    let user = users.filter( u=> u._id.equals(id) || u.profile.username === id)[0];
    console.log(id);
    console.log(user);
    return res.status(200).send(user);

  })
};


export const createUser=(req,res)=>{
  let {first_name,last_name,email,password,confirmPassword} = req.body;

  User.findOne({email})
  .populate({path:'profile',select:'-__v'})
  .exec((err,u)=>{
    //Server error
    if(err) return res.status(500).send(err);

    // if user exist send error message
    if(u) return res.status(400).send(`User already exists`);
    else{
      let profile=new Profile();

      let user=new User({
        email,
        password,
        first_name,
        last_name,
        profile:profile._id
      });

      let username=user.first_name.replace(/\s/g,'');
      usernameCheck(username)
      .then(response=>{
        if(response == 0) profile.username=username;
        else profile.username=`${username}${response}`;
        profile.save(err=>{
          if(err) return res.status(500).send(err);
        });
        user.save(err=>{
          if(err) return res.status(500).send(err);
          let {first_name,last_name,email,_id} = user;
          return res.status(200).send({user:{_id,first_name,last_name,email,profile},token:createToken(user._id)});
        });
      });


    }

  })

}

function usernameCheck(username){
  return new Promise((resolve,reject)=>{
    Profile.find({},(e,profiles)=>{
      let results=profiles.filter(p=> p.username.startsWith(username));
      resolve(results.length);
    });

  });
}
