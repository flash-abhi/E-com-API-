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
    static addItem(productId,userId,quantity){
        const user = UserModel.getAll().find(u => u.id == userId);
        const product = ProductModel.getALL().find(p => p.id == productId);
        if( !user ){
            return "User Not Found";
        }
        if(!product){
            return "Product Not Found";
        }
        const cartItem = new CartItemModel(productId,userId,quantity);
        cartItem.id = cartItems.length+1;
        cartItems.push(cartItem);
    }
    static getAll(userId){
        return cartItems.filter(i => i.userId == userId);
    }
}

let cartItems = [
    new CartItemModel(1,2,1,1),
    new CartItemModel(1,1,2,2)
]
