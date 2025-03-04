import { getDb } from "../../config/mongoDB.js";
import { ApplicationError } from "../../Error-Handling/application-error.js";

export class UserModel{
    constructor(name,email,password,type,id){
        this._id = id;
        this.name = name
        this.email = email
        this.password = password
        this.type = type
    }
    
    static signIn(email,password){
        const user = users.find(u => u.email == email && u.password == password);
        return user;
    }
    static getAll(){
        return users;
    }
}
let users = [
    {
        "_id": 1,
        "name":"Seller User",
        "email": "seller@ecom.com",
        "password": "Password1",
        "type": "seller"
    },
    {
        "_id": 2,
        "name":"Customer User",
        "email": "customer@ecom.com",
        "password": "Password1",
        "type": "customer"
    }

]