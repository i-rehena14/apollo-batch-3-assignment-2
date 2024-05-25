import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//create product
const createProduct = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

//get all product and search product
const getAllProducts = async (filter = {}) => await Product.find(filter);

//getting product by id
const getProductByID = async (id: string) => {
  const result = await Product.findOne({ _id: { $eq: id } });
  return result;
};
//delete product from db
const deleteProduct = async (_id: string) => {
  const result = await Product.deleteOne({ _id });
  return result;
};

//update product
const updateProduct = async (_id: string, setProduct: object) => {
  const result = await Product.updateOne({ _id }, { $set: setProduct });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
};
