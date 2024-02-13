import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: Date.now,
  },
  lastActivity: { type: Date, default: Date.now },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
