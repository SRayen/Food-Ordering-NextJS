import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
export async function PUT(req) {
  try { 
    const body = await req.json();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const session = await getServerSession(authOptions);

    const email = session.user.email;
    const user = await User.findOneAndUpdate(
      { email },
      { name: body.user_name },
      { new: true }
    );
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
