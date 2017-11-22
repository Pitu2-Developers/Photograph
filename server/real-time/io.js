import mongoose from 'mongoose';
import User from '../models/user';
import cookieParser from 'cookieparser';

module.exports=(server)=>{
  const io = require('socket.io')(server,{cookie:false});

  io.use((socket,next)=>{
    let isIndex=cookieParser.parse(socket.handshake.headers.cookie).index;
    if(isIndex === 'false') next();
  });


  io.of('/').on('connection',(socket)=>{
    socket.on('login',data=>{
        User.findOneAndUpdate({_id:data},{socket_id:socket.id}).exec();
    });

    socket.on('logout',data=>{
      User.findOneAndUpdate({_id:data},{socket_id:null}).exec();
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
