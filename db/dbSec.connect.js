const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  if (mongoose.connections[0].readyState) {
    isConnected = true;
    console.log("=> Already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error);
    throw error;
  }
};
module.exports = connectDB;
