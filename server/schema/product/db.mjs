import { connect, Schema, model } from "mongoose";

connect(process.env.DATABASE_URL);

const taskSchema = new Schema({
  model: String,
  description: String,
  price: Number,
  category: String,
  manufacturer: String,
  supplier: String,
  originCountry: String,
});

export const ProductModel = model("product", taskSchema, "product");
