import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct=async(productData:TProduct)=>{
    const result = await Product.create(productData);
    return result;
}
const getAllProducts = async () => {
    const result = await Product.find();
    return result;
  };
  const getProductByID = async (id:string) => {
    const result = await Product.findById(id);
    return result;
  };
  const deleteProduct = async (id:string) => {
    const result = await Product.deleteOne({ _id: { $eq: id } });
    return result;
  };
  const updateProduct = async (id:string,setProduct:any) => {
    const result = await Product.updateOne({_id:{$eq:id}}, { $set: setProduct } );
    return result;
  };

export const ProductServices={
    createProduct,
    getAllProducts,
    getProductByID,
    deleteProduct,
    updateProduct
}