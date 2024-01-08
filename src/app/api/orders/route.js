import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Order } from "@/app/models/Order";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req) {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    if (_id) {
      return NextResponse.json(await Order.findById(_id));
    }

    if (admin) {
      return NextResponse.json(await Order.find());
    }

    if (userEmail) {
      return NextResponse.json(await Order.find({ userEmail }));
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
