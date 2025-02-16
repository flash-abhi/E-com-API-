import express from "express"
import ProductController from "./Product.controller.js";

const router = express.Router()

const productcontroller = new ProductController()
router.get('/',productcontroller.getAllProducts)
router.post('/',productcontroller.addProduct)

export default router;