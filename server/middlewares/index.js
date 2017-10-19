<<<<<<< HEAD
import jwt from 'jwt-simple';

import {SECRET_TOKEN} from '../config';

export function isAuth(req,res,next) {
  console.log("LOG");
  if(!req.headers.authorization){
    return res.status(403).send('Error!');
  }
  const token= req.headers.authorization.split(' ')[1];
  try {
    const payload=jwt.decode(token,SECRET_TOKEN);
    if(payload.exp <= moment().unix()) return res.status(401).send('Error expiration token');
    next();
  } catch (e) {
    return res.status(403).send("don't have access");
  }
=======


export function isAuth(req,res,next) {
  console.log(req.headers);
  next();
>>>>>>> ca2c4304ac2911810790dd0b10ce53bddf3f8840
}
