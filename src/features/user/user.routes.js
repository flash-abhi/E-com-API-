import express from "express";
import { UserController } from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
export const userRouter = express.Router();
const usercontroller = new UserController();
userRouter.post("/signup",(req,res)=>{
    usercontroller.signup(req,res);
})
userRouter.post("/signin",(req,res)=>{
    usercontroller.signin(req,res);
})
userRouter.put("/resetPassword",jwtAuth,(req,res)=>{
    usercontroller.resetPassword(req,res);
})

