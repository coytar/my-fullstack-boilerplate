import { UserModel } from "./db.js";

// Queries
export const UserQuery = {
  users: async (parent, args, contextValue, info) => {
    // return await UserModel.find();
    let { page, pageSize } = args;
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    // return await UserModel.aggregate([
    //   { $skip: pageSize * (page - 1) },
    //   { $limit: pageSize },
    // ]);

    // get all items to get item count
    let items = await UserModel.find();
    // get current page
    let data = await UserModel.aggregate([
      { $skip: pageSize * (page - 1) },
      { $limit: pageSize },
    ]);
    // get next page
    let nextData = await UserModel.aggregate([
      { $skip: pageSize * (page) },
      { $limit: pageSize },
    ]);
    // console.log(nextData.length);
    return {
      data,
      count: items.length,
      nextPage: nextData.length > 0
    };
  },
  getUser: async (parent, args, contextValue, info) => {
    return await UserModel.findById(args._id);
  },
};
