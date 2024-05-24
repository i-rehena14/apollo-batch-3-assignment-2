import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { OrderZodSchema } from "./order.validation";

const makeOrder = async (req: Request, res: Response) => {
  try {
   //data validation using zod
   const zodParsedOrderedData= OrderZodSchema.parse(req.body)
    const result =await OrderServices.makeOrder(zodParsedOrderedData);
    
    res.status(200).json({
      success: true,
      message: "Ordered successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not make Order!",
      error: err,
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

export const OrderControllers={
    makeOrder,
    getAllOrders
}