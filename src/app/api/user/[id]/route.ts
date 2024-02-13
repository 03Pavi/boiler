import connectToServer from "@/lib/server";
import User from "@/app/models/user.model";
import { NextResponse } from "next/server";
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const isDeleted = await User.findByIdAndDelete(id);
  if (isDeleted) {
    return NextResponse.json(
      {
        message: "user deleted successfully !",
        success: true,
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "There is some error in deleting",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
};
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await connectToServer();
  const getUsersTodos = await User.findOne({ username: params.id }).populate(
    "todos"
  );
  if (!getUsersTodos) {
    return NextResponse.json("Todos not found!", { status: 404 });
  } else {
    return NextResponse.json({ data: getUsersTodos.todos }, { status: 200 });
  }
};
