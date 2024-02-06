import { ProductModel } from "./db.mjs";

// Mutations
export const ProductMutation = {
  addProduct: async (parent, args, contextValue, info) => {
    const product = new ProductModel({
      description: args.description,
    });
    return await product.save();
  },
  updateProduct: async (parent, args, contextValue, info) => {
    return await ProductModel.findByIdAndUpdate(args._id, { new: true });
  },
};
