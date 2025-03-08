import { ObjectId } from "mongodb";
import {getDb} from "../../config/mongoDB.js"
import { ApplicationError } from "../../Error-Handling/application-error.js";
export default class CartItemsRepository{
    constructor(){
        this.collection = "cartItems"
    }

    async addItem(productId,userId,quantity){
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            await collection.insertOne({productId:new ObjectId(productId),userId:new ObjectId(userId),quantity});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database...", 500);
        }
    }

    async getAll(userId){
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            return await collection.find({userId: new ObjectId(userId)}).toArray();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database...", 500);
        }
    }

    async deleteItems(cartItemId , userId){
       try{
            const db = getDb();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({userId: new ObjectId(userId), _id: new ObjectId(cartItemId)});
            return result.deletedCount>0;
       }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database...", 500);
       }
    }
}