import connectToServer from "@/lib/server";
import Todo from "@/app/models/todo.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const secret = process.env.NEXT_PUBLIC_SECRET || "secret";
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await connectToServer();
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  jwt.verify(token.value, secret, function (err: any) {
    console.log("hello");
  });
  const getAllTodo = await Todo.findOne({ author: params.id });
  if (getAllTodo.length <= 0) {
    return NextResponse.json(
      { message: "todo list is empty" },
      {
        status: 404,
      }
    );
  } else {
    return NextResponse.json({ data: getAllTodo }, { status: 200 });
  }
};
