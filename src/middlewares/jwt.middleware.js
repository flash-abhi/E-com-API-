import jwt from "jsonwebtoken"
const jwtAuth = (req,res,next)=>{
    // 1. Read the token.

    const token = req.headers["authorization"];
   
    // 2. If no token return the error.

    if(!token){
        return res.status(401).send("Unauthorized");
    }

    // 3. check if token is valid.

    try{
    const payload = jwt.verify(token, "mMyWDpQd5eK5rTd0Qkz6OT4r6YxCaLyA");
    req.userId = payload.UserId;
    console.log(payload);
    }catch(err){
     // 4. call next middleware.
        return res.status(401).send("Unauthorized");
    }

    // 5. return error.
    next();
}
export default jwtAuth;