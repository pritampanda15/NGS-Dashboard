const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const jobRoutes = require('./routes/jobRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);  // Exit if MongoDB connection fails
  });

// Root route for welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the NGS Dashboard Backend API');
});

// Registering Routes
app.use('/api/files', fileRoutes);
app.use('/api/jobs', jobRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
