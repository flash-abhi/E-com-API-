import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken"
export class UserController{
    signup(req,res){
        const {name,email,password,type} = req.body;
        const user = UserModel.signUp(name,email,password,type);
        res.status(201).send({status:"success", user:user})
    }
    singin(req,res){
        const {email,password} = req.body;
        const result = UserModel.signIn(email,password);
        if(!result){
            res.status(400).send({status:"failed", msg:"invalid user details"});
        }else{
            // 1. create a jwt token 
            const token = jwt.sign({UserId:result.id,email:result.email},"mMyWDpQd5eK5rTd0Qkz6OT4r6YxCaLyA",{
                expiresIn:"2h"
            });
            // 2. send token
            return res.status(200).send(token);
        }
    }
}