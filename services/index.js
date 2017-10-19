import jwt from 'jwt-simple';
import moment from 'moment';
import {SECRET_TOKEN} from '../server/config';



export function decodeToken(token){

  const decode= new Promise( (resolve, reject) => {
      try {
        const payload= jwt.decode(token,SECRET_TOKEN);
        if(payload.exp <= moment.unix()){
          reject({
            status:401,
            message:'Expired token'
          });
        }
        resolve(payload.sub);
      } catch (e) {
        reject({
          status:500,
          message:'Invalid token'
        })
      }
  });

  return decode;

}

export function createToken(user) {
  const payload={
    //User id
    sub:user._id,
    //Issued at
    iat:moment().unix(),
    //expire time
    exp:moment().add(1,'days').unix()
  };

  return jwt.encode(payload,SECRET_TOKEN);

}


export function isAuth() {
  const token=localStorage.getItem('token');
  try {
    const payload=jwt.decode(token,SECRET_TOKEN);
    if(payload.exp <= moment().unix()){
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
