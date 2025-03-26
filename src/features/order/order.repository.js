import { ObjectId } from "mongodb";
import { getClient, getDb } from "../../config/mongoDB.js";
import OrderModel from "./order.model.js";

export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }
    async placeOrder(userId){
        const client = getClient();
        const session = client.startSession();
       try{
        const db = getDb();
        session.startTransaction();
         // 1. Get cartItems and calculate the totalAmount.
         const items = await this.getTotalAmount(userId,session);
         const finalTotalAmount = items.reduce((acc, items)=> acc+items.totalAmount, 0);
         console.log(finalTotalAmount)
         // 2. Create an order Record.
         const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
         await db.collection(this.collection).insertOne(newOrder,{session});
         // 3. Reduce the stock.
        for(let item of items){
            await db.collection("products").updateOne({_id:item.productId},
                {$inc:{stock:-item.quantity}},{session}
            )
        }
        // throw new Error("something went wrong");
         // 4. Clear the cart items.
         db.collection("cartItems").deleteMany({userId:new ObjectId(userId)},{session});
         session.commitTransaction();
         session.endSession();
         return;
       }catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log(err);
       }
    }
    async getTotalAmount(userId,session){
        const db = getDb();
       const items = await db.collection("cartItems").aggregate([
            // 1. Get cartItems for the user.
            { 
                $match:{userId: new ObjectId(userId)}
            },
            // 2. Get the products from products collection.
            {
                $lookup: {
                    from:"products",
                    localField:"productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            // 3. unwind the product info.

            {
                $unwind: "$productInfo"
            },

            // // 4. calculate totalAmount for each cartItems.
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    }
                }
            }
        ],{session}).toArray()

        return items;
    }
}