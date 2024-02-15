import mongoose from "mongoose";
const MongoServer = process.env.MONGO_URL || "mongodb://localhost:27017/curd";
const connectToServer = async () => {
  console.log();
  try {
    const isConnected = await mongoose.connect(MongoServer);
    if (isConnected) {
      console.log("mongoose connected SuccessFully!");
    }
  } catch (err) {
    console.log(err);
  }
};
export default connectToServer;
