import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import asyncHandler from 'express-async-handler'

const authenticator = asyncHandler(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(400)
        throw new Error("Not found");
    }
    const {_id} = jwt.verify(token,process.env.SECRET);
    req.user = await User.findOne({_id}).select('_id');
    next();
})

export default authenticator;