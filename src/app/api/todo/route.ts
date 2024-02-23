import connectToServer from "@/lib/server";
import Todo from "@/app/models/todo.model";
import User from "@/app/models/user.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import cron from "node-cron";
const schedule = "1 * * * * *";
const isEpired = cron.schedule(schedule, () => {
  const token = cookies().get("token");
  if (token) {
    const isVerify = jwt.verify(
      token.value,
      process.env.NEXT_PUBLIC_SECRET || "secret"
    ) as jwt.JwtPayload;
    if (!isVerify) {
      return false;
    } else {
      return true;
    }
  }
});
const GET = async () => {
  try {
    await connectToServer();
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    isEpired.start();
    const decoded = jwt.verify(
      token.value,
      process.env.NEXT_PUBLIC_SECRET || "secret"
    ) as jwt.JwtPayload;
    // Current timestamp in seconds
    const user = await User.findOne({ username: decoded.data.username });
    const getAllTodo = await Todo.find({ author: user._id });
    if (getAllTodo.length <= 0) {
      return NextResponse.json(
        { message: "Todo list is empty" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({ data: getAllTodo }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Token Expired" }, { status: 500 });
  }
};

const POST = async (req: Request) => {
  const { username, todo } = await req.json();
  if (!todo) {
    return NextResponse.json({
      message: "Fields can't be empty",
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
