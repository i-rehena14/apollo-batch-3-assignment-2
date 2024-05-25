/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { ProductZodSchema } from "./product.validation";

//controller for creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    //data validation using zod
    const zodParsedData = ProductZodSchema.parse(productData);
    const result = await ProductServices.createProduct(zodParsedData);

    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not create product!",
      error: err,
    });
  }
};

//controller for getting all the products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts();

    res.status(200).json({
      success: true,
      message: "All Products are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch products!",
      error: err,
    });
  }
};

//controller for fetching a specific product
const getProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getProductByID(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch the product!",
      error: err,
    });
  }
};

//Controller for deleting the product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProduct(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not delete the product!",
      error: err,
    });
  }
};

//Controller for updating the product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const setProduct = req.body;
    const result = await ProductServices.updateProduct(productId, setProduct);

    res.status(200).json({
      success: true,
      message: "Product updated successfully !",
      data: { setProduct, result },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not update the product!",
      error: err,
    });
  }
};

//Controller for searching product
const searchProduct = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;
  try {
    if (!searchTerm) {
      const result = await ProductServices.getAllProducts();

      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      const result = await ProductServices.searchProduct(searchTerm);
      res.status(200).json({
        success: result.length === 0 ? false : true,
        message:
          result.length === 0
            ? `'${searchTerm}' not found`
            : `'Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch the product!",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
  searchProduct,
};
