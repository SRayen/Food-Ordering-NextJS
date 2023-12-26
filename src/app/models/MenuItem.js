import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const menuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number },
    category: { type: ObjectId, ref: "Category" },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", menuItemSchema);
