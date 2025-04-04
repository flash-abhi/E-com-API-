import "dotenv/config"
import express from "express";
import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js";
import {userRouter} from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import orderRouter from "./src/features/order/order.routes.js";
import bodyParser from "body-parser";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" with { type: "json" };
import cors from "cors";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/Error-Handling/application-error.js";
// import {connectToDB} from "./src/config/mongoDB.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import { likesRouter } from "./src/features/likes/likes.routes.js";
const app = express();

// for all requests related to product, redirect to product routes.
// CORS Policy configuration.
app.use(cors());
//  app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers", "*");
//     // return OK for preflight request.
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
//  })
app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));
app.use("/api/products",jwtAuth,productRouter);
app.use("/api/users",userRouter);
app.use("/api/carts",jwtAuth,cartRouter);
app.use("/api/orders",jwtAuth,orderRouter);
app.use("/api/likes",jwtAuth,likesRouter);
app.get('/',(req,res)=>{
    res.send("welcome to api");
})
app.use((req,res)=>{
    res.status(404).send("API Not Found Please check our documentation for more information at localhost:4000/api-docs");
})
app.use((err,req,res,next)=>{
    if(err instanceof mongoose.Error.ValidationError)
        return res.status(400).send(err.message)
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    console.log(err);
    res.status(500).send("Something went wrong please try after some time.")
})

app.listen(4000,()=>{
    console.log("server is listening on port : 4000");
    // connectToDB();
    connectUsingMongoose();
})
