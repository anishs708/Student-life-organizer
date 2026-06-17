import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT;


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("connected to DB"))
.catch((error) => console.log(error));

app.listen((port), ()=>{console.log(`Server listening at port http:localhost:${port}`)});
