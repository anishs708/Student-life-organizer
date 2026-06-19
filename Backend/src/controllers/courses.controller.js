import Course from "../models/courses.model.js";
import asyncHandler from "express-async-handler"

export const createCourse = asyncHandler(async((req,res)=>{
    const {name,courseCode,academicTerm} = req.body;
    const user = req.user._id;
    if(!user){
        res.status(400)
        throw new Error("User don't exist");
    }
    if(!name || !courseCode || !academicTerm){
        res.status(400)
        throw new Error("fields missing")
    }
    const newCourse = await Course.create(name,courseCode,academicTerm,user);
    res.status(200).json(newCourse);
}))
export const deleteCourse = asyncHandler(async((req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400)
        throw new Error ("the object id doesn't exist")
    }
    const course = await Course.findOneAndDelete({
        _id:id
    });
    if(!course){
        res.status(400)
        throw new Error("No course found")
    }
    res.status(200).json(course)
}))
export const updateCourse = asyncHandler(async((req,res)=>{

}))
export const getAllCourse = asyncHandler(async((req,res)=>{
    const user_id = req.user.id
    const courses = await Course.find({user: req.user._id}).sort({createdAt: -1})
    res.status(200).json(courses)
}))
export const getACourse = asyncHandler(async((req,res)=>{
    const{id} = req.params
}))