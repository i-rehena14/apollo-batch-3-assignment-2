"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductZodSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas for each part of the model
// Variant validation schema
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1).max(255),
    value: zod_1.z.string().min(1).max(255)
});
// Inventory validation schema
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
    inStock: zod_1.z.boolean()
});
// Product validation schema
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().min(1).max(1000),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().min(1).max(255),
    tags: zod_1.z.array(zod_1.z.string().min(1).max(255)),
    variants: zod_1.z.array(VariantValidationSchema),
    inventory: InventoryValidationSchema
});
// Export the product schema
exports.ProductZodSchema = ProductValidationSchema;
