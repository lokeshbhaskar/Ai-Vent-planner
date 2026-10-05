import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!!");
    return true;
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message || error);
    return false;
  }
};

export default connectDB;