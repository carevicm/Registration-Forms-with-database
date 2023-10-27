import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";

dotenv.config({ path: ".env.development" });

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 0) {
    return;
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
}

export { connectToDatabase };
