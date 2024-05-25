import { TOrder } from "./order.interface";
import { Order } from "./order.model";

//create an order
const makeOrder = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

//get all the orders and get order by email
const getAllOrders = async (findOrder = {}) => await Order.find(findOrder);

export const OrderServices = {
  makeOrder,
  getAllOrders,
};
