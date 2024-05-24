/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { OrderZodSchema } from "./order.validation";
import { Product } from "../products/product.model";

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
      if (orderedProduct.inventory.quantity < zodParsedOrderedData.quantity) {
        throw new Error("Insufficient quantity in stock");
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

export const OrderControllers = {
  makeOrder,
  getAllOrders,
};
