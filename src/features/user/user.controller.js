import { UserModel } from "./user.model.js";
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
            return res.send({status:"success" ,msg:"Login Successful"});
        }

    }
}