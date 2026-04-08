import mongoose from 'mongoose';

/**
 * MongoDB connection URI from environment variables.
 * This should be set in your .env.local file for local development
 * and in your deployment environment for production.
 */
const MONGODB_URI: string = process.env.MONGODB_URI || '';

/**
 * Validate that the MongoDB URI is provided.
 * Throws an error if the environment variable is missing.
 */
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Interface for the cached connection object.
 * This helps maintain type safety for the global cache.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Global declaration to extend the Node.js global object.
 * This allows us to cache the database connection across module reloads in development.
 */
declare global {
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Cached connection object.
 * Uses a global variable to persist the connection across hot reloads in development.
 */
let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

/**
 * Initialize the global cache if it doesn't exist.
 */
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB using Mongoose with connection caching.
 * This function ensures that only one connection is established and reused,
 * preventing multiple connections during development hot reloads.
 *
 * @returns Promise<typeof mongoose> - The Mongoose instance
 * @throws Error if connection fails
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Disable mongoose buffering to prevent issues with serverless functions
        bufferCommands: false,
        // Additional connection options for better reliability
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      })
      .then((mongoose) => mongoose);
  }

  try {
    // Await the connection promise
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise on failure to allow retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;