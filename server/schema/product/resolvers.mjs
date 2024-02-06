import { ProductQuery } from "./query.mjs";
import { ProductMutation } from "./mutation.mjs";
      
export const ProductResolvers = {
  Query: {
    ...ProductQuery,
  },
  Mutation: {
    ...ProductMutation,
  },
};
