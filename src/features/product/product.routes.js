import express from "express"
import ProductController from "./Product.controller.js";
import {upload} from "../../middlewares/fileUpload.middleware.js"
const router = express.Router()

const productcontroller = new ProductController()
router.get('/',productcontroller.getAllProducts)
router.post('/',upload.single('imageUrl'),productcontroller.addProduct)
router.get("/:id", productcontroller.getOneProduct)
export default router;