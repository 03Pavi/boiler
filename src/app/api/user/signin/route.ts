import connectToServer from "@/lib/server";
import User from "@/app/models/user.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const secret = process.env.NEXT_PUBLIC_SECRET || "secret";
export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();
  await connectToServer();
  const user = await User.findOne({ username });
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const Token = jwt.sign(
      {
        data: user,
      },
      secret,
      {
        expiresIn: 60,
      }
    );
    cookies().set("token", Token);
    return NextResponse.json(
      {
        message: "user login successfully !",
        success: true,
        user,
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "user is not register! ",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
};
