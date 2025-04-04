import express from "express";
import { LikeController } from "./like.controller.js";

export const likesRouter = express.Router();

const likeController = new LikeController();

likesRouter.post("/",(req,res,next)=>{
    likeController.likeItem(req,res,next);
});

likesRouter.get("/",(req,res,next)=>{
    likeController.getLikes(req,res,next);
})

