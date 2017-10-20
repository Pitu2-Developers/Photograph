import express from 'express';
const auth = express.Router();
import {SignIn} from '../controllers/auth';
import {isAuth} from '../middlewares';

auth.post('/photograph',SignIn)



export default auth;
