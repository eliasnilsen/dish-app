import mongoose from "mongoose";

export type DishType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  spiceLevel: string;
  prepTime: string;
  allergens: string[];
  imageUrls: string[];
  lastUpdated: Date;
};

const dishSchema = new mongoose.Schema<DishType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  spiceLevel: { type: String, required: true },
  prepTime: { type: String, required: true },
  allergens: [{ type: String, required: true }],
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
});

const Dish = mongoose.model<DishType>("Dish", dishSchema);
export default Dish;
