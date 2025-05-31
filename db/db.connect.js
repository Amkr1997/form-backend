const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const initialisation = async () => {
  try {
    // const connectDB = await mongoose.connect(process.env.MONGO_URI, {
    //   serverSelectionTimeoutMS: 5000, // 5 seconds
    //   socketTimeoutMS: 45000, // 45 seconds
    // });

    const connectDB = await mongoose.connect(process.env.MONGO_URI);

    if (connectDB) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initialisation };
