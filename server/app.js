import express from 'express';
const app =express();
import bodyParser from 'body-parser';
import API from './routes/api.js';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//localhost:800/api
app.use('/api',API);



export default app;
