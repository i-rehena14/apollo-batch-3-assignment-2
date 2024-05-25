import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct); //uploading a new product
router.get("/", ProductControllers.getAllProducts); //fetching all the products or search product
router.get("/:productId", ProductControllers.getProductByID); //fetch a specific product
router.delete("/:productId", ProductControllers.deleteProduct); //deleting a product
router.put("/:productId", ProductControllers.updateProduct); //updating a product

export const ProductRoutes = router;
