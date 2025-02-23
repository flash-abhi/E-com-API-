import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import {userRouter} from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import bodyParser from "body-parser";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
const app = express();
// for all requests related to product, redirect to product routes.
app.use(bodyParser.json());
app.use("/api/products",jwtAuth,productRouter);
app.use("/api/users",userRouter);
app.use("/api/carts",jwtAuth,cartRouter);
app.get('/',(req,res)=>{
    res.send("welcome to api");
})

app.listen("4000",()=>{
    console.log("server is listening on port : 4000");
})
