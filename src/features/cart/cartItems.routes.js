import express from "express";
import { CartItemController } from "./cartItems.controller.js";


const cartRouter = express.Router();
cartRouter.delete("/delete/:id",CartItemController.delete)
cartRouter.post("/addCart",CartItemController.add);
cartRouter.get("/cartitems",CartItemController.getCartItems);

export default cartRouter;