import { ApplicationError } from "../../Error-Handling/application-error.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }
   async getAllProducts(req,res){
       try{
        const products = await this.productRepository.getAll();
        res.status(200).send(products);
       }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database...",500);
    }
    }
    async addProduct(req,res){
        // console.log(req.body)
        // console.log("Post request send");
        // res.status(200).send("Post request received");
        try{
        const {name, price , sizes,category} = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            category,
            imageUrl :req.file.filename
        };
        const createdRecord = await this.productRepository.add(newProduct);
        res.status(201).send(createdRecord);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database...",500);
        }
    }
    async rateProduct(req,res,next){
        const userId =req.userId;
        const productId = req.query.productId;
        const rating = req.query.rating;
        try{
           await this.productRepository.rateProduct(userId,productId,rating);
        }catch(err){
            console.log(err);
            return res.status(400).send(err.message);
        }
        return res.status(200).send("rating added !!");
        next()
    }
   async getOneProduct(req,res){
       try{
        const id = req.params.id;
        const product = await this.productRepository.get(id);
        if(!product){
            res.status(404).send("Product not found");
        }
        else{
            res.status(200).send(product);
        }
       }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database...",500);
       }
        
    }
   async filterProducts(req,res){
       try{
        const minPrice = parseFloat(req.query.minPrice);
        const maxPrice = parseFloat(req.query.maxPrice);
        const category = req.query.category;
        const result = await this.productRepository.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
       }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database...",500);
       }
    }

    async averagePrice(req,res){
        try{
            const result = await this.productRepository.averageProductPrice();
            return res.status(200).send(result);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database...",500);
        }
    }

}