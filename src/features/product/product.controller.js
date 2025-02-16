import ProductModel from "./product.model.js";
export default class ProductController{
    getAllProducts(req,res){
        const products = ProductModel.GetALL();
        res.status(200).send(products)
    }
    addProduct(req,res){
        console.log(req.body)
        console.log("Post request send");
        res.status(200).send("Post request received");
    }
    rateProduct(req,res){

    }
    getOneProduct(req,res){

    }

}