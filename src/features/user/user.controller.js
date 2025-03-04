import { ApplicationError } from "../../Error-Handling/application-error.js";
import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken"
import UserRepository from "./user.repository.js";
export class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async signup(req,res){
        const {name,email,password,type} = req.body;
        const newUser = new UserModel(
            name,
            email,
            password,
            type
        )
        try{
        const user = await this.userRepository.signUp(newUser);
        res.status(201).send({status:"success", user:user})
        }catch(err){
            throw new ApplicationError("Something Went wrong !!" , 500);
        }
    }
    singin(req,res){
        const {email,password} = req.body;
        const result = UserModel.signIn(email,password);
        if(!result){
            res.status(400).send({status:"failed", msg:"Incorrect Credentials"});
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