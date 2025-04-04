import { LikeRepository } from "./like.repository.js";

export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }
    async likeItem(req,res,next){
        try{
            const {id, type} = req.body;
            const {userId} = req.userId;
            if(type != "products" && type != "category"){
                return res.status(400).send("Invalid Type")
            }
            if(type == "products"){
                this.likeRepository.likeProduct(userId,id)
            }else{
                this.likeRepository.likeCategory(userId,id)
            }
            return res.status(200).send("likes is added");
        }catch(err){
            console.log(err);
        }
    }
    async getLikes(req,res,next){
        try{
           const {id,type}=req.query;
           const likes = await this.likeRepository.getLikes(id,type);
           return res.status(200).send(likes);
        }catch(err){
            this.likeRepository.getLikes()
        }
    }
}