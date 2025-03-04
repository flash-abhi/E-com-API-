import express from "express";
import { UserController } from "./user.controller.js";
export const userRouter = express.Router();
const usercontroller = new UserController();
userRouter.post("/signup",(req,res)=>{
    usercontroller.signup(req,res)
})
userRouter.post("/signin",usercontroller.singin)

