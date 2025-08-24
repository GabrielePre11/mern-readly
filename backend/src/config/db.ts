import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const db = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI || "";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connection = await mongoose.connect(mongodbURI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error(error);
    }
    process.exit(1); // 1 : Exit the process with failure
  }
};
