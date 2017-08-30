import app from './app';
const server =require('http').Server(app);
const io = require('socket.io')(server);

//MongolDB 
import mongoose from 'mongoose';
mongoose.Promise= global.Promise;
import {PORT,URI} from './config';


mongoose.connect(URI,{useMongoClient:true}).
  then(()=>{
    console.log('Connected to MongoDB');
    server.listen(PORT,'0.0.0.0',()=>console.log(`Server on port ${PORT}`));
  }).
  catch(err => console.log(`ERROR! ${err}`))
