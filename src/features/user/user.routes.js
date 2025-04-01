import express from "express";
import { UserController } from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
export const userRouter = express.Router();
const usercontroller = new UserController();
userRouter.post("/signup",(req,res,next)=>{
    usercontroller.signup(req,res,next);
})
userRouter.post("/signin",(req,res,next)=>{
    usercontroller.signin(req,res,next);
})
userRouter.put("/resetPassword",jwtAuth,(req,res)=>{
    usercontroller.resetPassword(req,res);
})

