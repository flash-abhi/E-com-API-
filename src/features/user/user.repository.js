import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import {ApplicationError} from "../../Error-Handling/application-error.js"
const UserModel = mongoose.model("users",userSchema);

export default class UserRepository{

    async signUp(user){
        try{
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }catch(err){
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }
            else {
                throw new ApplicationError("Something went wrong with database",500);
            }
        }
    }
    async findByEmail(email){
        try{
           return await UserModel.findOne({email})
        }catch(err){
            console.log(err);
            
        }
    }
    async resetPass(userId,newPassword){
        try{
            let user = await UserModel.findById(userId);
            if(user){
                user.password = newPassword;
                await user.save();
            }else {
                throw new Error("User not found");
            }
        }catch(err){
            console.log(err);
        }
    }
}