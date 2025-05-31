const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const initialisation = async () => {
  try {
    // const connectDB = await mongoose.connect(process.env.MONGO_URI, {
    //   serverSelectionTimeoutMS: 5000, // 5 seconds
    //   socketTimeoutMS: 45000, // 45 seconds
    // });

    const connectDB = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Serverless optimizations
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
    });

    if (connectDB) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initialisation };
