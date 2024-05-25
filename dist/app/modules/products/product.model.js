"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
//Schema for the variant
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'Variant type is required.']
    },
    value: {
        type: String,
        required: [true, 'Variant value is required.']
    },
});
//schema for the inventory
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.']
    },
    inStock: {
        type: Boolean,
        required: [true, 'Stock is required.']
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    tags: [{
            type: String,
            required: [true, "tags is required"]
        }],
    variants: [{
            type: variantSchema,
            required: [true, "variants is required"]
        }],
    inventory: {
        type: inventorySchema,
        required: [true, "inventory is required"]
    },
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
