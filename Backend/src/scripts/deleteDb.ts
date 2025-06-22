import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "../models/cars.model";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!).then(async () => {
  try {
    await Car.collection.drop();
    console.log("✅ Car collection dropped successfully");
  } catch (err: any) {
    if (err.code === 26) {
      console.log("⚠️ Collection does not exist.");
    } else {
      console.error("❌ Error dropping collection:", err);
    }
  } finally {
    mongoose.connection.close();
  }
});
