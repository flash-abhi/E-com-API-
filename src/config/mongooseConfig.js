import mongoose from "mongoose";
import "dotenv/config";
import { categorySchema } from "../features/product/category.schema.js";
const url = process.env.DB_URL;
export const connectUsingMongoose = async ()=>{
try{
    const connection = await mongoose.connect(url);
    await createIndexes(connection.connection.db);
    await addCategories();
    console.log("mongoDb using mongoose is Connected");
}catch(err){
    console.log(err);
}
}
const createIndexes = async (db) =>{
    try{
   await db.collection("products").createIndex({price:1});
   await db.collection("products").createIndex({name:1,sizes:-1});
   await db.collection("products").createIndex({description:"text"});
       console.log("price index created")
    }catch(err){
        console.log(err);
    }
}
export const getClient = ()=>{
    return mongoose.connection.getClient();
}
export const getDb =  ()=>{
    return mongoose.connection.db;
}

export async function addCategories() {
    const CategoryModel = new mongoose.model('category',categorySchema);
    const category = await CategoryModel.find();
    if(!category || category.length == 0){
        await CategoryModel.insertMany([{name: "Books"},{name: "Clothing"}, {name: "Electronics"}]);  
    }
    console.log("categories are added")
} 