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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
//create product
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
//get all product and search product
const getAllProducts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}) { return yield product_model_1.Product.find(filter); });
//getting product by id
const getProductByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: { $eq: id } });
    return result;
});
//delete product from db
const deleteProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id });
    return result;
});
//update product
const updateProduct = (_id, setProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.updateOne({ _id }, { $set: setProduct });
    return result;
});
exports.ProductServices = {
    createProduct,
    getAllProducts,
    getProductByID,
    deleteProduct,
    updateProduct,
};
