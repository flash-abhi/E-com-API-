import { UserModel } from "../features/user/user.model.js";
const basicAuthorizer=(req,res,next)=>{
    // 1. Check if authorization header is empty.
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }
    console.log(authHeader);
    // 2. Extract Credential. [Basic wjffjjfjhhfhfjhfjjfhhghfjsjnruruncj]
    const base64Credentials = authHeader.replace("Basic ","");
    console.log(base64Credentials);
    // 3. Decode Credential 
    const decodeCredentails = Buffer.from(base64Credentials, "base64").toString("utf-8");
    console.log(decodeCredentails); //[username:password]
    const cred  = decodeCredentails.split(":");
    const user = UserModel.getAll().find(u => u.email == cred[0] && u.password == cred[1]);
    if(user){
        next();
    }
    else{
        res.status(401).send("Incorrect Credentials");
    }
}
export default basicAuthorizer;


