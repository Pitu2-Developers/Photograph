import User from '../models/user';
import Post from '../models/post';
import Profile from '../models/profile';

import {createToken} from '../../services/index';
import fs from 'fs';


export const getAllPost=(req,res)=>{
  res.status(200).send('OK');
};


export const uploadController=(req,res,next)=>{
  const path=`${req.file.destination}/${req.body.user}`,
        source=fs.createReadStream(`${req.file.destination}/${req.file.filename}`);
  if(!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
  console.log(`PATH: ${path}`);

  const dest=fs.createWriteStream(`${path}/${req.file.filename}`);
  source.pipe(dest);
  source.on('end',()=>{
    fs.unlinkSync(`${req.file.destination}/${req.file.filename}`);
  });
  source.on('erro',e=>{
    console.log(e);
  });
  res.status(200).send({test:1});

}

// import {User,Post} from '../models/models';

export const testController=(req,res)=>{

  Profile.findOne({user:'59e905822716ba458d2764c9'})
  .populate('user')
  .exec((e,u)=>{
    res.send(u);
  })
  //
  // Profile.find()
  // .populate({
  //   path:'user',
  //   match:{
  //     email:'4811095288ic@gmail.com'
  //   }
  // })
  // .exec((e,u)=>{
  //   // u=u.filter((u)=>u.user != null);
  //   let user=u.filter(u=>u.user !=null)[0];
  //   if(e) return res.status(500).send(`Server error ${e}`);
  //   if(!user) return res.status(403).send({text:'Email doesn\'t match any account'});
  //   if(user.user.comparePassword('demonio0')){
  //     let {_id,first_name,last_name,email}=user.user;
  //       res.status(200).send({
  //         user:{
  //           _id,
  //           first_name,
  //           last_name,
  //           email,
  //           username:user.username,
  //           profile_img:user.profile_img
  //         }
  //     });
  //   }else res.send('NO HAY');
  // });
  // Profile.find({},(e,u)=>{
  //   if(e) res.status(500).send(e);
  //   res.status(200).send(u);
  // });
  //REMOVE
  // User.find({},(e,u)=>{
  //   if(e) res.status(500).send(e)
  //   for(let i = u.length; i >=5 ; i-- ){
  //     let id=u[i-1]._id
  //     u[i-1].remove(e=>{
  //       if(e) res.status(500).send(err);
  //       console.log(`Remove ${u[i-1].first_name}`);
  //     });
  //   }
  //   res.status(200).send(u);
  // });
}


//GET USER
export const getCurrentUser=(req,res)=>{
  const id= req.params.id

  Profile.findOne({user:id}).populate('user').exec((e,u)=>{
      if(e) res.status(500).send('Server error');
      if(!u) res.status(400).send('Error your user not exist');
      let {first_name,last_name,email,_id} = u.user,
      {profile_img,username}=u;
      res.status(200).send({user:{username,profile_img,_id,first_name,last_name,email}})

  });
  // User.findById(id,(e,u)=>{
  //   if(e) res.status(500).send('Server error');
  //   if(!u) res.status(400).send('Error your user not exist');
  //   let {first_name,last_name,email,_id} = u;
  //   res.status(200).send({user:{_id,first_name,last_name,email}})
  // });
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
        let {first_name,last_name,email,_id} = user;
        let {username,profile_img}=profile;
        return res.status(200).send({user:{_id,username,profile_img,first_name,last_name,email},token:createToken(user)});
      });
    }

  });

}
