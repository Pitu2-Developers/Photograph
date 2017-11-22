import app from './app';

export const server =require('http').Server(app);

import io from './real-time/io';
io(server)


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
