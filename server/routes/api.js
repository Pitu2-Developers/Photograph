import express from 'express';
import {createUser,testController} from '../controllers/api.js';
const api=express.Router();


api.get('/users', testController);

// localhost:8000/api/users
api.post('/users',createUser);


export default api;
