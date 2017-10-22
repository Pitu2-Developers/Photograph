import express from 'express';
import {createUser,testController,uploadController,getCurrentUser,getAllPosts} from '../controllers/api.js';
const api=express.Router();
import {isAuth} from '../middlewares';
import upload from '../services/multer';




// localhost:8000/api/users

api.get('/users/:id',getCurrentUser);
api.post('/users',createUser);
api.get('/users',testController);

api.get('/users/:id/posts',getAllPosts);


api.post('/photos/upload/',upload.single('file'),uploadController);

export default api;
