import { ProductTypes } from "./product/types.mjs";
import { ProductResolvers } from "./product/resolvers.mjs";
import { TaskTypes } from "./task/types.mjs";
import { TaskResolvers } from "./task/resolvers.mjs";
import { UserTypes } from "./user/types.mjs";
import { UserResolvers } from "./user/resolvers.mjs";

export const typeDefs = [ProductTypes, TaskTypes, UserTypes];

export const resolvers = [ProductResolvers, TaskResolvers, UserResolvers];
