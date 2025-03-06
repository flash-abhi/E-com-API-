import express from "express";
import ProductController from "./Product.controller.js";
import {upload} from "../../middlewares/fileUpload.middleware.js";
const router = express.Router();

const productcontroller = new ProductController();
router.post('/rating',(req,res,next)=>{
    productcontroller.rateProduct(req,res,next);
});
router.get('/',(req,res)=>{
    productcontroller.getAllProducts(req,res);
});
router.post('/add',upload.single('imageUrl'),(req,res)=>{
    productcontroller.addProduct(req,res);
});
router.get("/filter",(req,res)=>{
    productcontroller.filterProducts(req,res);
});
router.get("/:id", (req,res)=>{
    productcontroller.getOneProduct(req,res);
});
export default router;