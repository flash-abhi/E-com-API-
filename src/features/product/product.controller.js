import ProductModel from "./product.model.js";
export default class ProductController{
    getAllProducts(req,res){
        const products = ProductModel.getALL();
        res.status(200).send(products)
    }
    addProduct(req,res){
        // console.log(req.body)
        // console.log("Post request send");
        // res.status(200).send("Post request received");
        const {name, price , sizes} = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl :req.file.filename
        };
        const createdRecord = ProductModel.AddProduct(newProduct);
        res.status(201).send(createdRecord);
    }
    rateProduct(req,res){
        const userId =req.query.userId;
        const productId = req.query.productId;
        const rating = req.query.rating;
        try{
            ProductModel.rateProduct(userId,productId,rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
        return res.status(200).send("rating added !!");
    }
    getOneProduct(req,res){
        const id = req.params.id;
        const product = ProductModel.get(id);
        if(!product){
            res.status(404).send("Product not found");
        }
        else{
            res.status(200).send(product);
        }
        
    }
    filterProducts(req,res){
        const minPrice = parseFloat(req.query.minPrice);
        const maxPrice = parseFloat(req.query.maxPrice);
        const category = req.query.category;
        const result = ProductModel.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
    }

}