import { Schema, model, models } from "mongoose";
import * as bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 8) {
          new Error("password must be at least 8 characters");
          return false;
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.post("validate", async function (user) {
  const password = user.password;
  user.password = await bcrypt.hash(password, 10);
});

export const User = models?.User || model("User", userSchema);
