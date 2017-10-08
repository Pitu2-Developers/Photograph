import express from 'express';
const auth = express.Router();
import {SignIn} from '../controllers/auth';

auth.post('/photograph',SignIn)



export default auth;
