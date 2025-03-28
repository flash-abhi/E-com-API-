import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
const UserModel = mongoose.model("users",userSchema);

export default class UserRepository{

    async signUp(user){
        try{
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }catch(err){
            console.log(err);
        }
    }
    async findByEmail(email){
        try{
           return await UserModel.findOne({email})
        }catch(err){
            console.log(err);
        }
    }
}