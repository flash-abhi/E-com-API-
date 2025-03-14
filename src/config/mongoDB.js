import { MongoClient } from "mongodb";
let client;
export const connectToDB = ()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance =>{
        client = clientInstance;
        console.log("MongoDB is Connected");
        createCounter(client.db());
    })
    .catch(err =>{
        console.log(err);
    })
}
export const getDb =  ()=>{
    return client.db()
}
const createCounter = async (db)=>{
    const existingCounter =  await db.collection('counters').findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection('counters').insertOne({_id:'cartItemId',value:0});
    }
}