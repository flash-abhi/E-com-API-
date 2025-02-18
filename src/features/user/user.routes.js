import express from "express";
import { UserController } from "./user.controller.js";
export const userRouter = express.Router();
const usercontroller = new UserController();
userRouter.post("/signup",usercontroller.signup)
userRouter.post("/signin",usercontroller.singin)

