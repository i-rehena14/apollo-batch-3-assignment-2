import { z } from "zod";
// Zod validation schemas for each part of the model



// Variant validation schema
const VariantValidationSchema = z.object({
    type: z.string().min(1).max(255),
    value: z.string().min(1).max(255)
});

// Inventory validation schema
const InventoryValidationSchema = z.object({
    quantity: z.number().int().positive(),
    inStock: z.boolean()
});

// Product validation schema
const ProductValidationSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    price: z.number().positive(),
    category: z.string().min(1).max(255),
    tags: z.array(z.string().min(1).max(255)),
    variants: z.array(VariantValidationSchema),
    inventory: InventoryValidationSchema
});

// Export the product schema
export const ProductZodSchema = ProductValidationSchema;
