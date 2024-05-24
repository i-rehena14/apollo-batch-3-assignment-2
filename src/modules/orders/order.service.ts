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

export const OrderServices = {
  makeOrder,
  getAllOrders,
};
