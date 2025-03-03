import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb"

const connectToDB = ()=>{
    MongoClient.connect(url)
    .then(client =>{
        console.log("MongoDB is Connected");
    })
    .catch(err =>{
        console.log(err);
    })
}

export default connectToDB;