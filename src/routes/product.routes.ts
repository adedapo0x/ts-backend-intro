import express from "express";
import reqValidate from "../middlewares/req-validate"
import requireUser from "../middlewares/requireUser";
import {productSchema} from "../schema/product.schema";
import {createProduct, deleteProduct, getProduct, updateProduct} from "../controllers/product.controller";

const router = express.Router();

router.post('/api/products', requireUser, reqValidate(productSchema), createProduct)
router.get('/api/products/:id', reqValidate(productSchema), getProduct)
router.put('/api/products/:productId', requireUser, reqValidate(productSchema), updateProduct)
router.delete('/api/products/:id', requireUser, reqValidate(productSchema), deleteProduct)

export default router