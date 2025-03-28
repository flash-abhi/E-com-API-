import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl:String,
    price:Number,
    category: String,
    stock:Number
});

// this.name = name
// this.description = description
// this.imageUrl = imageUrl
// this.category = category
// this.price = price
// this.sizes = sizes
