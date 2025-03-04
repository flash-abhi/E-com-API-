import { getDb } from "../../config/mongoDB.js";
import { ApplicationError } from "../../Error-Handling/application-error.js";

class UserRepository{
    async signUp(newUser){
        try{
        // 1. get the db
        const db = getDb();

        // 2. get the collection 
        const collection = db.collection('users');

        // 3. Insert the Document.
        await collection.insertOne(newUser)
        return newUser;
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
    async signIn(email, password){
        try{
        // 1. get the db
        const db = getDb();

        // 2. get the collection 
        const collection = db.collection('users');

        // 3. Insert the Document.
        return await collection.findOne({email,password})
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
}
export default UserRepository;