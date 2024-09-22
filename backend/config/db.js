const mongoose = require('mongoose');

// Connects to MongoDB and handles connection errors
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {  // Connect using the connection string from .env
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');  // Successful connection
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);  // Connection failed
    process.exit(1);  // Exits process with failure code
  }
};

module.exports = connectDB;  // Exports the function for use in other files
