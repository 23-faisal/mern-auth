import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully!!!`);
  } catch (err) {
    console.log(err.message);
    console.log(`DB is not connected!`);
    process.exit(1);
  }
};
