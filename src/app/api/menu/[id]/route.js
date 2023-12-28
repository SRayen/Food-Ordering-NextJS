import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { MenuItem } from "@/app/models/MenuItem";

export async function PUT(req) {
  try {
    const id = req.url.split("/").pop();
    const body = await req.json();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const hasNewName = !!body?.name;
    const hasNewDecscription = !!body?.description;
    const hasNewImage = !!body?.image;
    const hasNewCategory = !!body?.category;
    const hasNewBasePrice = !!body?.basePrice;
    const hasNewSizes = !!body?.sizes;
    const hasNewExtraIngredientPrices = !!body?.extraIngredientPrices;

    const updateFields = {
      ...(hasNewExtraIngredientPrices && {
        extraIngredientPrices: body.extraIngredientPrices,
      }),
      ...(hasNewName && { name: body.name }),
      ...(hasNewDecscription && { description: body.description }),
      ...(hasNewImage && { image: body.image }),
      ...(hasNewCategory && { category: body.category }),
      ...(hasNewBasePrice && { basePrice: body.basePrice }),
      ...(hasNewSizes && { sizes: body.sizes }),
    };

    const menuItem = await MenuItem.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return NextResponse.json(menuItem, { status: 200 });
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

    const deletedMenuItem = await MenuItem.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Menu item has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

