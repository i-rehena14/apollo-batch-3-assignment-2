import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/orders/order.route";
const app = express()

//json parser
app.use(express.json());
 
// routes
app.use("/api/products",ProductRoutes);
app.use("/api/orders",OrderRoutes);

//not found route
app.get('*', (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    message: '404 not found',
  });
});

app.get('/', (req:Request, res:Response) => {
  res.send('Hello Next Dev!!!')
})

export default app;