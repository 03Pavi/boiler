import connectToServer from "@/lib/server";
import User from "@/app/models/user.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const secretkey = process.env.NEXT_PUBLIC_SECRET || "secret";

const POST = async (req: Request) => {
  await connectToServer();
  const { username } = await req.json();
  const user = await User.findOne({ username });
  if (!user) {
    const userData = await User.create({ username });
    if (userData) {
      const findUser = await User.find({ username: userData.username }).exec();
      return NextResponse.json({
        message: "user added successfully !",
        data: findUser,
        success: true,
      });
    }
  } else {
    return NextResponse.json(
      {
        message: "username is already Taken! ",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
};

const GET = async (req: NextRequest) => {
  await connectToServer();
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get("email");
  const user = await User.findOne({ username });
  if (user) {
    const Token = jwt.sign(
      {
        data: user,
      },
      secretkey
    );
    cookies().set("token", Token);
    // await user.token.push(Token);
    // await user.save();
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

// const GET = async () => {
//   const getAlluser = await User.find({}).populate("todos");
//   if (getAlluser.length > 0) {
//     return NextResponse.json(
//       {
//         data: getAlluser,
//         success: true,
//       },
//       { status: 200 }
//     );
//   } else {
//     return NextResponse.json(
//       {
//         message: "no user data is availabel",
//         success: false,
//       },
//       { status: 400 }
//     );
//   }
// };

export { POST, GET };
