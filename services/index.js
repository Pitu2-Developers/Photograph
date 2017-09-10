import jwt from 'jwt-simple';
import moment from 'moment';
import {SECRET_TOKEN} from '../server/config';


export function createToken(user) {
  const payload={
    //User id
    sub:user._id,
    //Issued at
    iat:moment().unix(),
    //expire time
    exp:moment().add(10,'days').unix()
  };

  return jwt.encode(payload,SECRET_TOKEN);

}


export function isAuth() {
  const token=localStorage.getItem('token');
  try {
    const payload=jwt.decode(token,SECRET);
    return true;
  } catch (e) {
    return false;
  }
}
