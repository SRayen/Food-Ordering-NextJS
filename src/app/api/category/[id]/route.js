import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Category } from "@/app/models/Category";

export async function PUT(req) {
  try {
    const id = req.url.split("/").pop();
    const { name } = await req.json();

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

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

    const updatedCategorie = await Category.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );

    return NextResponse.json(updatedCategorie, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.url.split("/").pop();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const deletedCategorie = await Category.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Category has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
