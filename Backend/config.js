// config.js
import mongoose from "mongoose";

const uri =  "your-url-here";


async function run() {
  try {
    await mongoose.connect(uri, {
      // recommended options
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { run };
