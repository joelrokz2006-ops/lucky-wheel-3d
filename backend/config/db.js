const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/lucky_wheel_3d';
  
  // Disable mongoose buffering to prevent hanging requests when DB is offline
  mongoose.set('bufferCommands', false);

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️ MongoDB Connection not established (${error.message}).`);
    console.log(`ℹ️ Backend is running with auto in-memory storage fallback mode.`);
  }
};

const isDbConnected = () => isConnected;

module.exports = connectDB;
module.exports.isDbConnected = isDbConnected;
