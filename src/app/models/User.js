import { Schema, model, models } from "mongoose";
import * as bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
    },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
