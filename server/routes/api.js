import express from 'express';
import {createUser} from '../controllers/api.js';
const api=express.Router();



// localhost:8000/api/users
api.post('/users',createUser);


export default api;
