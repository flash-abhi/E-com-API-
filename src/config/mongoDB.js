import { MongoClient } from "mongodb";
let client;
export const connectToDB = ()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance =>{
        client = clientInstance;
        console.log("MongoDB is Connected");
    })
    .catch(err =>{
        console.log(err);
    })
}
export const getDb =  ()=>{
    return client.db()
}
