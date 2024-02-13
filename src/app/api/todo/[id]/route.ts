import connectToServer from "@/lib/server";
import Todo from "@/app/models/todo.model";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await connectToServer();
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
