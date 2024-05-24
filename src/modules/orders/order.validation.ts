import * as z from 'zod';

// Define Zod schema for order
const OrderSchema = z.object({
    email: z.string().email(),
    productId: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive()
});


// Export the order schema
export const OrderZodSchema = OrderSchema;
