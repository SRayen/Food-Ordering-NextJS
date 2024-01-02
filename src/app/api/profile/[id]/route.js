import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
export async function PUT(req) {
  try {
    //we can also search by mail using session:
    // const session = await getServerSession(authOptions);
    // const email = session.user.email;

    const id = req.url.split("/").pop();
    const body = await req.json();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const hasNewImage = !!body?.image;
    const hasNewPhone = !!body?.phone;
    const hasNewStreetAddress = !!body?.streetAddress;
    const hasNewPostalCode = !!body?.postalCode;
    const hasNewCity = !!body?.city;
    const hasNewCountry = !!body?.country;
    const hasNewUserName = !!body?.user_name;
    const isAdmin = !!body?.isAdmin;

    const updateFields = {
      ...(hasNewUserName && { name: body.user_name }),
      ...(hasNewImage && { image: body.image }),
      ...(hasNewPhone && { phone: body.phone }),
      ...(hasNewStreetAddress && { streetAddress: body.streetAddress }),
      ...(hasNewPostalCode && { postalCode: body.postalCode }),
      ...(hasNewCity && { city: body.city }),
      ...(hasNewCountry && { country: body.country }),
      ...(isAdmin ? { admin: true } : { admin: false }),
    };

    const user = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const user = await User.findOne({ email });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
