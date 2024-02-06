import { ProductModel } from "./db.mjs";

// Queries
export const ProductQuery = {
  products: async () => {
    return await ProductModel.find();
  },
  getProduct: async (parent, args, contextValue, info) => {
    return await ProductModel.findById(args._id);
  },
};
