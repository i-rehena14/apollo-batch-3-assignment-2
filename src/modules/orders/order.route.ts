import express from "express"
import { OrderControllers } from "./order.controller";

const router =express.Router()

router.post("/",OrderControllers.makeOrder);//make order
router.get("/",OrderControllers.getAllOrders);//get all the orders


export const OrderRoutes = router;