import { UserQuery } from "./query.mjs";
import { UserMutation } from "./mutation.mjs";
      
export const UserResolvers = {
  Query: {
    ...UserQuery,
  },
  Mutation: {
    ...UserMutation,
  },
};
