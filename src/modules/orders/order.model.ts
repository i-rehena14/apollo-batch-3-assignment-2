import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, "email is required."],
  },
  productId: {
    type: String,
    required: [true, "ProductId is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
});

export const Order = model<TOrder>("Order", orderSchema);
