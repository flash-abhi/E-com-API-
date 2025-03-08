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
}
