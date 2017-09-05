import express from 'express';
const app =express();
import bodyParser from 'body-parser';
import API from './routes/api.js';
import cors from 'cors';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

//localhost:800/api
app.use('/api',API);



export default app;
