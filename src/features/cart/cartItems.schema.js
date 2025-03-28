import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
productId : {type:mongoose.Schema.Types.ObjectId, ref: 'products'},
userId : {type:mongoose.Schema.Types.ObjectId,ref: 'users'},
quantity: Number
})

// this.productId = productId;
// this.userId = userId;
// this.quantity = quantity;
// this.id = id;