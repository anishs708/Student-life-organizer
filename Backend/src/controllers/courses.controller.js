import Course from "../models/courses.model.js";
import asyncHandler from "express-async-handler"

export const createCourse = asyncHandler(async((req,res)=>{

}))
export const deleteCourse = asyncHandler(async((req,res)=>{

}))
export const updateCourse = asyncHandler(async((req,res)=>{

}))
export const getAllCourse = asyncHandler(async((req,res)=>{
    const user_id = req.user.id
    const courses = await Course.find({user_id}).sort({createdAt: -1})
    res.status(200).json(courses)
}))
export const getACourse = asyncHandler(async((req,res)=>{
    const{id} = req.params
}))