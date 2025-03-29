import mongoose from "mongoose";
import "dotenv/config";
const url = process.env.DB_URL;
export const connectUsingMongoose = async ()=>{
try{
    const connection = await mongoose.connect(url);
    await createIndexes(connection.connection.db);
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