import jwt from "jsonwebtoken";
import {User} from "../models/users.model.js";
import asyncHandler from 'express-async-handler'

const authenticator = asyncHandler(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(401)
        throw new Error("Authentication required");
    }
    const {_id} = jwt.verify(token,process.env.SECRET);
    req.user = await User.findOne({_id}).select('_id');
    if (!req.user) {
      res.status(401);
      throw new Error("User no longer exists");
    }
    next();
})

export default authenticator;