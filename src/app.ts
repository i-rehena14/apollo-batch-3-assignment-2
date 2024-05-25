import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/orders/order.route";
const app = express();

//json parser
app.use(express.json());

// routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

//not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("server running");
});

export default app;
