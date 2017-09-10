import express from 'express';
const app =express();
import bodyParser from 'body-parser';
import API from './routes/api.js';
import cors from 'cors';
import cors from 'cors';
// Routes
import API from './routes/api';
import AUTH from './routes/auth';

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use(cors());

//localhost:800/api
app.use('/api',API);
//localhost:800/auth
app.use('/auth',AUTH)


export default app;
