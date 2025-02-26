import express from "express";
import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js";
import {userRouter} from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import bodyParser from "body-parser";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" with { type: "json" };
import cors from "cors";
const app = express();
// for all requests related to product, redirect to product routes.
app.use(bodyParser.json());
app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));
app.use("/api/products",jwtAuth,productRouter);
app.use("/api/users",userRouter);
app.use("/api/carts",jwtAuth,cartRouter);
app.get('/',(req,res)=>{
    res.send("welcome to api");
})
app.use((req,res)=>{
    res.status(404).send("API Not Found Please check our documentation for more information at localhost:4000/api-docs");
})
// CORS Policy configuration.
app.use(cors());


//  app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","http://localhost:4000");
//     res.header("Access-Control-Allow-Headers", "*");
//     // return OK for preflight request.
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
//  })
app.listen("4000",()=>{
    console.log("server is listening on port : 4000");
})
