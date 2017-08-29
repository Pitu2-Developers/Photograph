import express from 'express';
import {testController} from '../controllers/api.js';
const api=express.Router();



api.get('/',testController);


export default api;
