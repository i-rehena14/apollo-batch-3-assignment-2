/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { OrderZodSchema } from "./order.validation";
import { Product } from "../products/product.model";

//controller for making order
const makeOrder = async (req: Request, res: Response) => {
  try {
    //data validation using zod
    const zodParsedOrderedData = OrderZodSchema.parse(req.body);

    //find the ordered product
    const orderedProduct = await Product.findOne({
      _id: zodParsedOrderedData.productId,
    });

    if (orderedProduct !== null) {
      //check whether the ordered quantity is insufficient
      // if (orderedProduct.inventory.quantity < zodParsedOrderedData.quantity) {
      //   throw new Error("Insufficient quantity in stock");
      // }
      if (orderedProduct.inventory.quantity < zodParsedOrderedData.quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity in stock!",
        });
      }

      const result = await OrderServices.makeOrder(zodParsedOrderedData);

      if (result) {
        //updating the ordered product quantity
        const updatedQuantity = await Product.findByIdAndUpdate(
          orderedProduct?._id,
          {
            "inventory.quantity":
              orderedProduct.inventory.quantity - zodParsedOrderedData.quantity,
          },
          { new: true }
        );
        if (updatedQuantity !== null) {
          //check if the quantity became zero and change the inStock value
          if (updatedQuantity.inventory.quantity === 0)
            await Product.findByIdAndUpdate(
              orderedProduct?._id,
              {
                "inventory.inStock": false,
              },
              { new: true }
            );
        }
      }

      res.status(200).json({
        success: true,
        message: "Ordered successfully !",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not make Order!",
      error: err.message,
    });
  }
};

//controller for getting all the orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrders();

    res.status(200).json({
      success: true,
      message: "Orders are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch Orders!",
      error: err,
    });
  }
};

//controller for getting order by email
const getOrderByEmail = async (req: Request, res: Response) => {
  try {
    const orderByEmail = req.query.email;
    if (!orderByEmail) {
      const result = await OrderServices.getAllOrders();
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    } else {
      const result = await OrderServices.getOrderByEmail(orderByEmail);

      res.status(200).json({
        success: result.length === 0 ? false : true,
        message:
          result.length === 0
            ? "Order not found"
            : "Orders fetched successfully for the email!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Orders could not fetched for the email!",
      error: error,
    });
  }
};

export const OrderControllers = {
  makeOrder,
  getAllOrders,
  getOrderByEmail,
};
