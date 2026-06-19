import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authenticator from './src/middlewares/Auth.js'
import errorHandler from './src/middlewares/ErrorHandler.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(authenticator);
const port = process.env.PORT;
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("connected to DB"))
.catch((error) => console.log(error));

app.listen((port), ()=>{console.log(`Server listening at port http:localhost:${port}`)});
