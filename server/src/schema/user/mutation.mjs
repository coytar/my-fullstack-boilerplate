import { UserModel } from "./db.mjs";

// Mutations
export const UserMutation = {
  addUser: async (parent, args, contextValue, info) => {
    const user = new UserModel({
      description: args.description,
      completed: false,
    });
    return await user.save();
  },
  updateUser: async (parent, args, contextValue, info) => {
    return await UserModel.findByIdAndUpdate(
      args._id,
      { completed: args.completed },
      { new: true }
    );
  },
  deleteUser: async (parent, args, contextValue, info) => {
    let item = await UserModel.deleteOne({ _id: args._id });
    return item.deletedCount > 0;
  },
  deleteUsers: async (parent, args, contextValue, info) => {
    let delList = [];
    for (let id in args.list) {
      delList.push(await UserModel.deleteOne({ _id: args.list[id] }));
    }
    let promises = await Promise.all(delList);
    let count = 0;
    for (let prom in promises) {
      count += promises[prom].deletedCount;
    }
    return count;
  },
};
