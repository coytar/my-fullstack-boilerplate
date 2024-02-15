import { TaskModel } from "./db.mjs";
import jwt from "jsonwebtoken";

// Mutations
export const TaskMutation = {
  addTask: async (parent, args, contextValue, info) => {
    const { token } = contextValue;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const task = new TaskModel({
      description: args.description,
      completed: false,
      organisation: user.organisation,
    });
    return await task.save();
  },
  updateTask: async (parent, args, contextValue, info) => {
    return await TaskModel.findByIdAndUpdate(
      args._id,
      { completed: args.completed },
      { new: true }
    );
  },
  deleteTask: async (parent, args, contextValue, info) => {
    let item = await TaskModel.deleteOne({ _id: args._id });
    return item.deletedCount > 0;
  },
  deleteTasks: async (parent, args, contextValue, info) => {
    let delList = [];
    for (let id in args.list) {
      delList.push(await TaskModel.deleteOne({ _id: args.list[id] }));
    }
    let promises = await Promise.all(delList);
    let count = 0;
    for (let prom in promises) {
      count += promises[prom].deletedCount;
    }
    return count;
  },
};
