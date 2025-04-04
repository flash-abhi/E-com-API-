import mongoose from "mongoose";
import { likeSchema } from "./likes.schema.js";
import {ObjectId} from "mongodb";
const likeModel = mongoose.model("Like",likeSchema)
export class LikeRepository{
    async likeProduct(userId,productId){
        try{
            const newLike = new likeModel({
                users: new ObjectId(userId) ,
                likeable: new ObjectId(productId),
                Types: "products"
            });
            await newLike.save();
        }catch(err){
            console.log(err)
        }
    }
    async likeCategory(userId,categoryId){
        try{
            const newLike = new likeModel({
                users: new ObjectId(userId) ,
                likeable: new ObjectId(categoryId),
                Types: "category"
            });
            await newLike.save();
        }catch(err){
            console.log(err);
        }
    }
    async getLikes(userId,type){
        return await likeModel.find({
            likeable: new ObjectId(userId),
            Types: type
        }).populate('users').populate({path:"likeable",model: type});
    }
}