import mongoose from "mongoose";

export const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected ");
  } catch (error) {
    console.log("🛑Error", error);
  }
};
