import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
    const createdUser = await User.create(body);
    return Response.json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
