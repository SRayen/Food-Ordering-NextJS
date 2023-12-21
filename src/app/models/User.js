import { Schema, model, models } from "mongoose";
import * as bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
