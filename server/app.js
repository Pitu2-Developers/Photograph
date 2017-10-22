import express from 'express';
const app =express();
import bodyParser from 'body-parser';
import cors from 'cors';
// Routes
import API from './routes/api';
import AUTH from './routes/auth';
import multer from 'multer';


//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));
//localhost:800/api
app.use('/api',API);
//localhost:800/auth
app.use('/auth',AUTH)


export default app;
