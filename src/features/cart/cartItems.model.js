// userId , productId , quantity
import { UserModel } from "../user/user.model.js";
import ProductModel from "../product/product.model.js";
export class CartItemModel{
    constructor(productId,userId,quantity,id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }

    static deleteItems(cartItemId , userId){
        // console.log(`${cartItemId} ${userId}`);
      const index = cartItems.findIndex(i => i.id == cartItemId && i.userId == userId);
      if(index == -1){
        return "Item not found";
      }
        cartItems.splice(index,1);
    }
}

let cartItems = [
    new CartItemModel(1,2,1,1),
    new CartItemModel(1,1,2,2)
]
