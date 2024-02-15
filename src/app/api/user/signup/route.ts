import connectToServer from "@/lib/server";
import User from "@/app/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const POST = async (req: Request) => {
  await connectToServer();
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json(
      {
        message: "Fill the correct credential! ",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
  const user = await User.findOne({ username });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({ username, password: hashedPassword });
    if (userData) {
      return NextResponse.json({
        message: "user added successfully !",
        data: userData,
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

export { POST };
