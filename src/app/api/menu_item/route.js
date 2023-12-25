import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Category } from "../../models/Category";

export async function POST(req) {
  try {
    const { name } = await req.json();

    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    if (!name) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    const existingName = await Category.findOne({ name });
    if (existingName) {
      return NextResponse.json(
        { message: "Category name already exists" },
        { status: 400 }
      );
    }
    const createdCategory = await new Category({ name }).save();
    return NextResponse.json(createdCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
