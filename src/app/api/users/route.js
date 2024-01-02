import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "@/app/models/User";

export async function GET() {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
