const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const seatRoutes = require('./routes/seatRoutes');

dotenv.config();  // Loads environment variables from .env file into process.env
connectDB();      // Connects to MongoDB using the configuration in config/db.js

const app = express();  // Creates an Express application

app.use(cors());        // Enables CORS to allow cross-origin requests
app.use(express.json());  // Middleware to parse JSON bodies

app.use('/api', seatRoutes);  // Mounts seat routes at /api path

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {  // Starts the server on the specified port
  console.log(`Server running on ${PORT}`);
});
