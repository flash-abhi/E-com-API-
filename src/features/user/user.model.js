export class UserModel{
    constructor(name,email,password,type,id){
        this.id = id;
        this.name = name
        this.email = email
        this.password = password
        this.type = type
    }
    static signUp(name, email,password , type){
        const newUser = new UserModel(name,email,password,type);
        newUser.id = users.length +1;
        users.push(newUser);
        return newUser;
    }
    static signIn(email,password){
        const user = users.find(u => u.email == email && u.password == password);
        return user;
    }
}
var users = [{
    "id": 1,
    "name":"Seller User",
    "email": "seller@ecom.com",
    "password": "Password1",
    "type": "seller"

}]