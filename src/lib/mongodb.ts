/* eslint-disable prefer-const */
import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
console.log(MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env file"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};
global.mongooseCache = cached;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log("Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new database connection");
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connected successfully");
  } catch (error) {
    cached.promise = null;
    console.error("Database connection failed:", error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
