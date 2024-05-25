"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
//controller for creating a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        //data validation using zod
        const zodParsedData = product_validation_1.ProductZodSchema.parse(productData);
        const result = yield product_service_1.ProductServices.createProduct(zodParsedData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not create product!",
            error: err,
        });
    }
});
//controller for getting all the prodducts or searching product
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.searchTerm || "";
        const searchRegEx = new RegExp(".*" + search + ".*", "i");
        const findProduct = {
            $or: [{ name: { $regex: searchRegEx } }],
        };
        const allProducts = yield product_service_1.ProductServices.getAllProducts(findProduct);
        res.status(200).json({
            success: allProducts.length === 0 ? false : true,
            message: allProducts.length === 0
                ? `'${search}' not found`
                : `'Products fetched successfully!`,
            data: allProducts,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Could not fetch the products`,
            error: error.message,
        });
    }
});
//controller for fetching a specific product
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getProductByID(productId);
        res.status(200).json({
            success: result === null ? false : true,
            message: result === null
                ? `Product not found`
                : `'Products fetched successfully!`,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch the product!",
            error: err,
        });
    }
});
//Controller for deleting the product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProduct(productId);
        res.status(200).json({
            success: result.deletedCount === 0 ? false : true,
            message: result.deletedCount === 0
                ? `Product not found`
                : `'Product deleted successfully!`,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not delete the product!",
            error: err,
        });
    }
});
//Controller for updating the product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const setProduct = req.body;
        const result = yield product_service_1.ProductServices.updateProduct(productId, setProduct);
        res.status(200).json({
            success: true,
            message: "Product updated successfully !",
            data: { setProduct, result },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not update the product!",
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductByID,
    deleteProduct,
    updateProduct,
};
