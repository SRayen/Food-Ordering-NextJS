import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { MenuItem } from "@/app/models/MenuItem";

export async function POST(req) {
  try {
    const { name, image, description, basePrice } = await req.json();

    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    if (!name) {
      return NextResponse.json(
        { message: "Menu item name is required" },
        { status: 400 }
      );
    }

    const existingName = await Category.findOne({ name });
    if (existingName) {
      return NextResponse.json(
        { message: "Menu item  name already exists" },
        { status: 400 }
      );
    }
    const createdMenu = await new MenuItem({ name }).save();
    return NextResponse.json(createdMenu, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
