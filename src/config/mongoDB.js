import { MongoClient } from "mongodb";
import "dotenv/config";
import mongoose from "mongoose";
let client;
export const connectToDB = ()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance =>{
        client = clientInstance;
        console.log("MongoDB is Connected");
        // createCounter(client.db());
        createIndexes(client.db());
    })
    .catch(err =>{
        console.log(err);
    })
}
export const getClient = ()=>{
    return client;
}
export const getDb =  ()=>{
    return client.db();
}

// const createCounter = async (db)=>{
//     const existingCounter =  await db.collection('counters').findOne({_id:'cartItemId'});
//     if(!existingCounter){
//         await db.collection('counters').insertOne({_id:'cartItemId',value:0});
//     }
// }
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