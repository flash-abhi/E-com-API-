export class UserModel{
    constructor(name,email,password,type,id){
        this._id = id;
        this.name = name
        this.email = email
        this.password = password
        this.type = type
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