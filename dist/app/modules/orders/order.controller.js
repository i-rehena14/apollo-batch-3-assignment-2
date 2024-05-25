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
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const product_model_1 = require("../products/product.model");
//controller for making order
const makeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //data validation using zod
        const zodParsedOrderedData = order_validation_1.OrderZodSchema.parse(req.body);
        //find the ordered product
        const orderedProduct = yield product_model_1.Product.findOne({
            _id: zodParsedOrderedData.productId,
        });
        if (orderedProduct !== null) {
            if (orderedProduct.inventory.quantity < zodParsedOrderedData.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient quantity in stock!",
                });
            }
            const result = yield order_service_1.OrderServices.makeOrder(zodParsedOrderedData);
            if (result) {
                //updating the ordered product quantity
                const updatedQuantity = yield product_model_1.Product.findByIdAndUpdate(orderedProduct === null || orderedProduct === void 0 ? void 0 : orderedProduct._id, {
                    "inventory.quantity": orderedProduct.inventory.quantity - zodParsedOrderedData.quantity,
                }, { new: true });
                if (updatedQuantity !== null) {
                    //check if the quantity became zero and change the inStock value
                    if (updatedQuantity.inventory.quantity === 0)
                        yield product_model_1.Product.findByIdAndUpdate(orderedProduct === null || orderedProduct === void 0 ? void 0 : orderedProduct._id, {
                            "inventory.inStock": false,
                        }, { new: true });
                }
            }
            res.status(200).json({
                success: true,
                message: "Ordered successfully !",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not make Order!",
            error: err.message,
        });
    }
});
//controller for getting all the orders and get order by email
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const orders = yield order_service_1.OrderServices.getAllOrders(query);
        res.status(200).json({
            success: orders.length === 0 ? false : true,
            message: orders.length === 0
                ? `Orders not found`
                : `Orders fetched successfully!`,
            data: orders,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Could not fetch the orders`,
            error: error.message,
        });
    }
});
exports.OrderControllers = {
    makeOrder,
    getAllOrders,
};
