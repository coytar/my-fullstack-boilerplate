import { connect, Schema, model } from "mongoose";

connect(process.env.DATABASE_URL);

const taskSchema = new Schema({
  description: { type: String },
  completed: { type: Boolean },
  organisation: { type: String },
});

export const TaskModel = model("task", taskSchema, "task");
