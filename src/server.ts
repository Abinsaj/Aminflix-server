import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import router from './Routes/route';
import bodyParser from 'body-parser';

dotenv.config();
const port = process.env.PORT

const app = express();

const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/',router)

app.listen(port,()=>{
    console.log(`server is running on port no: ${port}`)
})

