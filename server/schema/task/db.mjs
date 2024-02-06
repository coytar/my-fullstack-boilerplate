import { connect, Schema, model } from "mongoose";

connect(process.env.DATABASE_URL);

const taskSchema = new Schema({
  description: String,
  completed: Boolean,
});

export const TaskModel = model("task", taskSchema, "task");
