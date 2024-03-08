import { TaskTypes } from "./task/types.mjs";
import { TaskResolvers } from "./task/resolvers.mjs";
import { UserTypes } from "./user/types.mjs";
import { UserResolvers } from "./user/resolvers.mjs";

export const typeDefs = [TaskTypes, UserTypes];

export const resolvers = [TaskResolvers, UserResolvers];
