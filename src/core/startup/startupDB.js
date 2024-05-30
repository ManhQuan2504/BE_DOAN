import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.MONGO_URL;

const initConnectToDB = async () => {
  try {
    mongoose.connect(db)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });;
    // await import("../../models/index.js");
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    throw error;
  }
};

export { initConnectToDB };
