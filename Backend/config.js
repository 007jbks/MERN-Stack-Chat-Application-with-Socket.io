// config.js
import mongoose from "mongoose";

const uri =  "mongodb+srv://jakemoriarty:brucewayne@cluster0.8puh0w9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


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
