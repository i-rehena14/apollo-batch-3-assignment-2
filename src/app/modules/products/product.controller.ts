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

//controller for getting all the prodducts or searching product
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const search = req.query.searchTerm || "";

    const searchRegEx = new RegExp(".*" + search + ".*", "i");

    const findProduct = {
      $or: [{ name: { $regex: searchRegEx } }],
    };

    const allProducts = await ProductServices.getAllProducts(findProduct);

    res.status(200).json({
      success: allProducts.length === 0 ? false : true,
      message:
        allProducts.length === 0
          ? `'${search}' not found`
          : `'Products fetched successfully!`,
      data: allProducts,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not fetch the products`,
      error: error.message,
    });
  }
};

//controller for fetching a specific product
const getProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getProductByID(productId);

    res.status(200).json({
      success: result === null ? false : true,
      message:
        result === null
          ? `Product not found`
          : `'Products fetched successfully!`,
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
      success: result.deletedCount === 0 ? false : true,
      message:
        result.deletedCount === 0
          ? `Product not found`
          : `'Product deleted successfully!`,
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
};
