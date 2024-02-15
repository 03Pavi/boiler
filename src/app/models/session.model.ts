import mongoose from "mongoose";
const BlacklistSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    token: [
      {
        type: String,
        ref: "User",
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

const Blacklist =
  mongoose.models.blacklist || mongoose.model("blacklist", BlacklistSchema);
export default Blacklist;
