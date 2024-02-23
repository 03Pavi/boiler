import Blacklist from "@/app/models/session.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/user.model";
const GET = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(
    token.value,
    process.env.NEXT_PUBLIC_SECRET || "secret"
  ) as jwt.JwtPayload;
  const user = await User.findOne({ username: decoded.data.username });
  try {
    // const checkIfBlacklisted = await Blacklist.findOne({
    //   token: token.value,
    // });
    // if (checkIfBlacklisted) {
    //   return NextResponse.json(
    //     { message: "session is Added to blacklist" },
    //     { status: 204 }
    //   );
    // }
    // const res = await Blacklist.create({ User: user._id, token: token.value });
    // if (res) {
    //
    // }
    cookies().set("token", "No-Token", { secure: true });
    return NextResponse.json(
      { message: "You are logged out!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went Wrong" },
      { status: 500 }
    );
  }
};

export { GET };
