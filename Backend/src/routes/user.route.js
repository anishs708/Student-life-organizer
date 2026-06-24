import express from "express";
import {signIn,deleteUser,updateUser,logIn} from "../controllers/users.controller.js"
import authenticator from "../middlewares/Auth.js"

const router = express.Router();

router.post('/signup',signIn);
router.delete('/:id',deleteUser);
router.post('/login',logIn);
router.patch('/:id',authenticator,updateUser );

export default router;
