import connectToServer from "@/lib/server";
import Todo from "@/app/models/todo.model";
import User from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
const GET = async () => {
  await connectToServer();
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  const data = jwt.verify(
    token?.value,
    process.env.NEXT_PUBLIC_SECRET || "secret"
  ) as JwtPayload | null;
  const user = await User.findOne({ username: data?.data?.username });
  const getAllTodo = await Todo.find({ author: user._id });
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

const POST = async (req: Request) => {
  const { username, todo } = await req.json();

  if (!todo) {
    return NextResponse.json({
      message: "Feilds can't be empty",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      const newTodo = new Todo({
        author: user._id,
        text: todo,
      });
      const savedTodo = await newTodo.save();
      // Update the User document's todos array
      user.todos.push(savedTodo._id);
      await user.save();
      return NextResponse.json({
        message: "Todo Added Successfully!",
        success: true,
        data: savedTodo,
      });
    } else {
      return NextResponse.json({
        message: "No User Found!",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unable to add todo", success: false },
      { status: 500 }
    );
  }
};

export { GET, POST };
