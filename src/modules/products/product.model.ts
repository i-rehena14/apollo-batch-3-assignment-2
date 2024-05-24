import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

//Schema for the variant
const variantSchema = new Schema<TVariant>({
    type: {
        type:String,
        required: [true, 'Variant type is required.'] 
    },
    value: {
        type:String,
        required: [true, 'Variant value is required.'] 
    },
});
//schema for the inventory
const inventorySchema =new Schema<TInventory>({
    quantity: {
        type:Number,
        required: [true, 'Quantity is required.'] 
    },
    inStock: {
        type:Boolean,
        required: [true, 'Stock is required.'] 
    },
});

const productSchema =new Schema<TProduct>({
    name: {
        type:String,
        required:[true,"Name is Required"]
    },
    description: {
        type:String,
        required:[true,"Description is required"]
    },
    price: {
        type:Number,
        required:[true,"price is required"]
    },
    category: {
        type:String,
        required:[true,"category is required"]
    },
    tags:[{
        type:String,
        required:[true,"tags is required"]
    }],
    variants: [{
        type:variantSchema,
        required:[true,"variants is required"]
    }],
    inventory: {
        type:inventorySchema,
        required:[true,"inventory is required"]
    },
});

export const Product = model<TProduct>("Product",productSchema); 