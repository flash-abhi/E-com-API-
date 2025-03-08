import express from "express";
import { CartItemController } from "./cartItems.controller.js";

const cartitemscontroller = new CartItemController();
const cartRouter = express.Router();
cartRouter.delete("/delete/:id",(req,res)=>{
    cartitemscontroller.delete(req,res);
})
cartRouter.post("/addCart",(req,res)=>{
    cartitemscontroller.add(req,res);
});
cartRouter.get("/cartitems",(req,res)=>{
    cartitemscontroller.getCartItems(req,res);
});

export default cartRouter;