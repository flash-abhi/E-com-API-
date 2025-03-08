import { CartItemModel } from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export class CartItemController{
    constructor(){
        this.cartItemRepository = new CartItemsRepository();
    }
    async add(req,res){
       try{
        const {productId,quantity} = req.query;
        const userId = req.userId;
        console.log(userId);
        await this.cartItemRepository.addItem(productId,userId,quantity);
        res.status(201).send("Cart Is Updated");
       }catch(err){
        console.log(err);
        return res.status(400).send("Something went wrong!!");
       }
    }
    async getCartItems(req,res){
        try{
            const userId = req.userId;
            const cartItems = await this.cartItemRepository.getAll(userId);
            return res.status(200).send(cartItems);
        }catch(err){
            console.log(err);
            return res.status(400).send("Something Went Wrong!!!");
        }
    }
    async delete(req,res){
        try{
            const userId = req.userId;
        const cartItemId = req.params.id;
        const isDeleted = await this.cartItemRepository.deleteItems(cartItemId,userId);
        if(!isDeleted){
            return res.status(404).send("Item is not Found");
        }
        res.status(200).send("Item is removed from the cart");
        }catch(err){
            console.log(err);
        }
    }
}