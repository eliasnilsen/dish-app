import mongoose from "mongoose";
import { DishType } from "../shared/types";

const dishSchema = new mongoose.Schema<DishType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  spiceLevel: { type: String, required: true },
  prepTime: { type: String, required: true },
  category: { type: String, required: true },
  allergens: [{ type: String }],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Dish = mongoose.model<DishType>("Dish", dishSchema);
export default Dish;
