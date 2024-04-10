import { Ingredient } from "./../shared/types";
import mongoose from "mongoose";
import { DishType } from "../shared/types";

const ingredientSchema = new mongoose.Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

const dishSchema = new mongoose.Schema<DishType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  spiceLevel: { type: String, required: true },
  prepTime: { type: String, required: true },
  category: { type: String, required: true },
  allergens: [{ type: String }],
  ingredients: { type: [ingredientSchema], required: true },
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Dish = mongoose.model<DishType>("Dish", dishSchema);
export default Dish;
