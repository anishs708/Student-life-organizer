import express from "express";
import {createCourse,deleteCourse,updateCourse,getAllCourse,getACourse} from "../controllers/courses.controller.js"
import authenticator from "../middlewares/Auth.js"

const router = express.Router();

router.get('/',getAllCourse);
router.get('/:id',getACourse);
router.post('/',createCourse);
router.delete('/:id',deleteCourse);
router.patch('/:id',authenticator,updateCourse );

export default router;
