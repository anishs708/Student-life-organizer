import {User} from '../models/users.model.js';
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import validator from 'validator';
import jwt from "jsonwebtoken";

const create = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

export const signIn = asyncHandler(async((req,res)=>{
    const{name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error("You have to put all the ")
    }
    if(!validator.isEmail(email)){
        res.status(400);
        throw new Error("the email is not valid")
    }
    const exist = await User.findOne({email})
    if(exist){
       res.status(400)
       throw new Error("The email already exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    const user = await User.create(name,email,password: hash)
    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
}))
export const deleteUser = asyncHandler(async((req,res)=>{
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(400)
        throw new Error("The user doesn't exist")
    }
    await user.deleteOne();
    res.status(201).json({
    message: "Account deleted successfully!"
    })
}))
export const updateUser = asyncHandler(async((req,res)=>{
    const{name} = req.body;
    const user = await User.findByIdAndUpdate(req.user.id,{name: name.trim()},{new: true,runValidators:true})
    if(!user){
        res.status(401)
        throw new Error("User not found!")
    }
    res.status(201).json({
       id: user._id,
       name: user.name,
       email: user.email,
    })
}))
export const logIn = asyncHandler(async((req,res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("Email & Password required");
    }
    const exists = await User.findOne({email})
    if(!exists){
    res.status(400)
    throw new Error("Email doesn't exist")
    }
    const validPassword = await bcrypt.compare(password,exists.password);
    if(!validPassword){
        res.status(400)
        throw new Error("Invalid password");
    }
    res.status(200).json({email})
}))