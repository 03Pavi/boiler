import mongoose from "mongoose";
const connectToServer = async () => {
  try {
    const isConnected = await mongoose.connect(
      "mongodb://localhost:27017/curd"
    );
    if (isConnected) {
      console.log("mongoose connected SuccessFully!");
    }
  } catch (err) {
    console.log(err);
  }
};
export default connectToServer;
