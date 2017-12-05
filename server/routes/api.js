import express from 'express';
import {
  getFollows,
  cancelFollowController,acceptFollowController,followController,updateUser,
  createUser,testController,uploadController,
  getCurrentUser,getAllPosts,searchController} from '../controllers/api.js';
const api=express.Router();
import {isAuth} from '../middlewares';
import upload from '../services/multer';




// localhost:8000/api/users

api.get('/users/:id',getCurrentUser);
api.post('/users/update/:id',updateUser);

api.post('/users',createUser);

api.post('/follow',followController);
api.post('/follow/cancel',cancelFollowController);
api.post('/follow/accept',acceptFollowController);
api.get('/:id/follows',getFollows);



api.get('/users/search/:username',searchController);

api.get('/test',testController);

api.get('/users/:id/posts',getAllPosts);


api.post('/photos/upload/',upload.single('file'),uploadController);

export default api;
