import { CartItemModel } from "./cartItems.model.js";

export class CartItemController{
    static add(req,res){
        const {productId,quantity} = req.query;
        const userId = req.userId;
        console.log(userId);
        const err = CartItemModel.addItem(productId,userId,quantity);
        console.log(err);
        if(err){
           return res.status(400).send("Cannot Update The Cart");
        }
        res.status(201).send("Cart Is Updated");
    }
    static getCartItems(req,res){
        const userId = req.userId;
        const cartItems = CartItemModel.getAll(userId);
        return res.status(200).send(cartItems);
    }
}