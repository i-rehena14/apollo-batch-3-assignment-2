import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const makeOrder = async (orderData: TOrder) => {
  const result = await Order.create(orderData);

  return result;
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

const getOrderByEmail = async (email: unknown) => {
  const result = await Order.find({ email });
  return result;
};

export const OrderServices = {
  makeOrder,
  getAllOrders,
  getOrderByEmail,
};
