import mongoose from 'mongoose';
import User from '../models/user';
import Profile from '../models/profile';
import cookieParser from 'cookieparser';

module.exports=(server)=>{
  const io = require('socket.io')(server,{cookie:false});

  io.use((socket,next)=>{
    try {
      let isIndex=cookieParser.parse(socket.handshake.headers.cookie+'').index;
      console.log(`INDEX: ${isIndex}`);
      if(isIndex === 'false') next();
      else if(isIndex === null){

      }
    } catch (e) {
      console.log("ERROR!");
      console.log(e);
    }
  });


  io.of('/').on('connection',(socket)=>{
    socket.on('login',data=>{
        User.findOneAndUpdate({_id:data},{socket_id:socket.id}).exec();
    });

    socket.on('logout',data=>{
      User.findOneAndUpdate({_id:data},{socket_id:null}).exec();
    });


    socket.on('followRequest',data=>{
      User.findOne({_id:data._id},'socket_id')
      .exec((e,u)=>{
          let {first_name,last_name,_id,profile_img,username,following,follower}=data;
          console.log(following);
          if(io.sockets.connected[u.socket_id]) io.sockets.connected[u.socket_id].emit('followRequest',{following,follower,user:{first_name,last_name,profile:{profile_img,username},socket_id:u.socket_id}});

      });
    });

    socket.on('cancelRequest',data=>{
      console.log(data);
    });

    socket.on('getNotifications',data=>{
      // io.sockets.connected[u.socket_id].emit('followRequest'
      if(!data.to){
        Profile.findOne({_id:data._id},'followers')
        .populate({
          path:'followers',
          populate:{
            path:'user',
            select:'first_name last_name profile socket_id',
            populate:{
              path:'profile',
              select:'profile_img username'
            }
          },
          match:{
            isPending:true
          }
        })
        .exec((e,p)=>{
          socket.emit('getNotifications',p.followers);
        });
      }else{
        User.findOne({_id:data.to},'profile socket_id').
        populate({
          path:'profile',
          select:'followers',
          populate:{
            path:'followers',
            match:{
              isPending:true
            }
          }
        })
        .exec((e,u)=>{
          io.sockets.connected[u.socket_id].emit('getNotifications',u.profile.followers);

        });
      }

    });

    socket.on('message',msg=>{
      console.log(msg);
      io.sockets.emit('follow',msg)
    });

    socket.on('disconnect',()=>{
      console.log(`${socket.id} DISCONNECTED `);
    });

    console.log(`New socket connected ${socket.id}`);
    socket.emit('subscribe',socket.id);
    console.log(`SOCKETS ON ${Object.keys(io.sockets.clients().sockets).length}`);
  });


}
