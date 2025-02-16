import express from "express"
import productRouter from "./src/features/product/product.routes.js"
import bodyParser from "body-parser"
const app = express()
// for all requests related to product, redirect to product routes.
app.use(bodyParser.json())
app.use("/api/products",productRouter)

app.get('/',(req,res)=>{
    res.send("welcome to api")
})

app.listen("4000",()=>{
    console.log("server is listening on port : 4000")
})
