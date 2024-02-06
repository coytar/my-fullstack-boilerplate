import { TaskQuery } from "./query.mjs";
import { TaskMutation } from "./mutation.mjs";
      
export const TaskResolvers = {
  Query: {
    ...TaskQuery,
  },
  Mutation: {
    ...TaskMutation,
  },
};
