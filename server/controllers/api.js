import User from '../models/user';
import Post from '../models/post';
import {createToken} from '../../services/index';
<<<<<<< HEAD
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
=======
// import {User,Post} from '../models/models';
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840

export const testController=(req,res)=>{

  // let p=new Post({
  //   description:'description 1',
  //   img:"htttp://www.lorempixel/500/600",
  //   _creator:'59b0745447201c026d350198',
  // });
  // p.save((e,p)=>{
  //   if(e) res.status(500).send('Error');
  //   res.status(200).send(p);
  // });
  //
  // User.findOne({_id:'59b0745447201c026d350198'},(err,user)=>{
  //   res.status(200).send(user)
  //
  //   // user.friends.push('59dfa5c72948462999da0fa9');
  //   // user.friends.pop(1);
  //
  //   user.save((err,u)=>{
  //     if(err) res.status(500).send(err);
  //     res.status(200).send(u);
  //   });
  // });
  // PRESENTAR

  User.find({},(e,u)=>{
    if(e) res.status(500).send(e);
    res.status(200).send(u);
  });
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


export const getCurrentUser=(req,res)=>{
  const id= req.params.id
  User.findById(id,(e,u)=>{
    if(e) res.status(500).send('Server error');
    if(!u) res.status(400).send('Error your user not exist');
    let {first_name,last_name,email,_id} = u;
    res.status(200).send({user:{_id,first_name,last_name,email}})
  });
};

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
<<<<<<< HEAD
        let {first_name,last_name,email,_id} = user;
        return res.status(200).send({user:{_id,first_name,last_name,email},token:createToken(user)});
=======
        return res.status(200).send({token:createToken(user)});
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
      });
    }

  });

}
