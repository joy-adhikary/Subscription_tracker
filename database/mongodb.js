import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from '../config/env.js';

if (NODE_ENV !== "prod") {
  mongoose.set("debug", true);
}

if (!DB_URI) {
  throw new Error(
    "DB_URI is not defined, please check your .env file for the correct value"
  );
}

// Connect to the MongoDB

const connectToDB = async () => {
  try {
    // await mongoose.connect(DB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // });
    await mongoose.connect(DB_URI);

    console.log(`Connected to the database in ${NODE_ENV} mode`);
  } catch (err) {
    console.error(`Failed to connect to the database in ${NODE_ENV} mode`, err);
    process.exit(1);
  }
};

export default connectToDB;