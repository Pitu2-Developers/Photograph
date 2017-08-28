import app from './app';
const server =require('http').Server(app);
const io = require('socket.io')(server)
import {PORT} from './config';

server.listen(PORT,()=>{
  console.log(`Server on port ${PORT}`);
});
