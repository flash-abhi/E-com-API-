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
    static delete(req,res){
        const userId = req.userId;
        const cartItemId = req.params.id;
        const err = CartItemModel.deleteItems(cartItemId,userId);
        if(err){
            return res.status(404).send(err);
        }
        res.status(200).send("Item is removed from the cart");
    }
}