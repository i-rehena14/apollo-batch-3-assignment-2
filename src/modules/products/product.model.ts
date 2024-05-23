import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>({
    type: {
        type:String,
        required:true
    },
    value: {
        type:String,
        required:true
    },
});

const inventorySchema =new Schema<TInventory>({
    quantity: {
        type:Number,
        required:true
    },
    inStock: {
        type:Boolean,
        required:true
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
        required:true
    },
    tags: {
        type:[String],
        required:true
    },
    variants: {
        type:[variantSchema]
    },
    inventory: {
        type:inventorySchema
    },
});

export const Product = model<TProduct>("Product",productSchema); 