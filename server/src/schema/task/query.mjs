import { TaskModel } from "./db.mjs";
import jwt from "jsonwebtoken";

// Queries
export const TaskQuery = {
  tasks: async (parent, args, contextValue, info) => {
    const { token } = contextValue;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // return await TaskModel.find();
    let { page, pageSize } = args;
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    // return await TaskModel.aggregate([
    //   { $skip: pageSize * (page - 1) },
    //   { $limit: pageSize },
    // ]);

    // get all items to get item count
    let items = await TaskModel.find({ organisation: user.organisation });
    // get current page
    let data = await TaskModel.aggregate([
      { $match: { organisation: user.organisation } },
      { $skip: pageSize * (page - 1) },
      { $limit: pageSize },
    ]);
    // get next page
    let nextData = await TaskModel.aggregate([
      { $skip: pageSize * page },
      { $limit: pageSize },
    ]);
    // console.log(nextData.length);
    return {
      data,
      count: items.length,
      nextPage: nextData.length > 0,
    };
  },
  getTask: async (parent, args, contextValue, info) => {
    return await TaskModel.findById(args._id);
  },
};
