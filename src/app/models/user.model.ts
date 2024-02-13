import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    // token: [String],
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        require: true,
      },
    ],
  },
  { versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
