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
          let {first_name,last_name,_id,profile_img,username,uuid}=data;
          if(io.sockets.connected[u.socket_id]) io.sockets.connected[u.socket_id].emit('followRequest',{isPending:true,uuid,user:{first_name,last_name,profile:{profile_img,username},socket_id:u.socket_id}});

      });

    });

    socket.on('acceptRequest',data=>{
      console.log("DATA");
        console.log(data);
        if(io.sockets.connected[data.receiver.socket_id]) io.sockets.connected[data.receiver.socket_id].emit('reload');


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
          let {followers}=p
          socket.emit('getNotifications',{followers});
        });
      }else{
        User.findOne({_id:data.to},'profile socket_id').
        populate({
          path:'profile',
          select:'followers following',
          populate:{
            path:'followers following',
            match:{
              isPending:true
            }
          }
        })
        .exec((e,u)=>{
          let {following,followers}=u.profile,notifications=[];
          if(io.sockets.connected[u.socket_id]) io.sockets.connected[u.socket_id].emit('getNotifications',{following,followers});

        });
      }

    });



    socket.on('disconnect',()=>{
      console.log(`${socket.id} DISCONNECTED `);
    });

    console.log(`New socket connected ${socket.id}`);
    socket.emit('subscribe',socket.id);
    console.log(`SOCKETS ON ${Object.keys(io.sockets.clients().sockets).length}`);
  });


}
