import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // reuse existing connection (important for serverless)

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  const conn = await mongoose.connect(uri);
  isConnected = true;
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
