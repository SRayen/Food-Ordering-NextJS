import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { MenuItem } from "@/app/models/MenuItem";

export async function POST(req) {
  try {
    const {
      name,
      image,
      description,
      basePrice,
      category,
      sizes,
      extraIngredientPrices,
    } = await req.json();
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    if (!name) {
      return NextResponse.json(
        { message: "Menu item name is required" },
        { status: 400 }
      );
    }

    const existingName = await MenuItem.findOne({ name });
    if (existingName) {
      return NextResponse.json(
        { message: "Menu item  name already exists" },
        { status: 400 }
      );
    }

    const createdMenu = await new MenuItem({
      name,
      image,
      description,
      basePrice,
      category,
      sizes,
      extraIngredientPrices,
    }).save();

    return NextResponse.json(createdMenu, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
    const menu_items = await MenuItem.find().populate("category");
    return NextResponse.json(menu_items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
