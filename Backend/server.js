import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import errorHandler from './src/middlewares/ErrorHandler.js'
import userRoutes from './src/routes/user.route.js'
import courseRoutes from './src/routes/course.route.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT;
app.use("/api/user",userRoutes);
app.use("/api/course",courseRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("connected to DB"))
.catch((error) => console.log(error));

app.listen((port), ()=>{console.log(`Server listening at port http:localhost:${port}`)});
