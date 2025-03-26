import { getDb } from "../../config/mongoDB.js";
import { ApplicationError } from "../../Error-Handling/application-error.js";

class UserRepository{
    constructor(){
        this.collection = "users";
    }
    async signUp(newUser){
        try{
        // 1. get the db
        const db = getDb();

        // 2. get the collection 
        const collection = db.collection(this.collection);

        // 3. Insert the Document.
        await collection.insertOne(newUser)
        return newUser;
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
    async findByEmail(email){
        try{
        // 1. get the db
        const db = getDb();

        // 2. get the collection 
        const collection = db.collection(this.collection);

        // 3. Insert the Document.
        return await collection.findOne({email})
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
}
export default UserRepository;