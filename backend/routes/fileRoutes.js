const express = require('express');
const multer = require('multer');
const path = require('path');
const Job = require('../models/Job');
const runRScript = require('../utils/runRScript');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Test route to ensure the files route is working
router.get('/', (req, res) => {
  res.send('Files endpoint is working');
});

// Route to handle file upload and job creation
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Create a new job with the uploaded filename
    const job = new Job({ filename: req.file.filename, status: 'pending' });
    await job.save();

    // Start the R script processing
    runRScript(job._id);

    res.status(201).json({ message: 'File uploaded and job created successfully', jobId: job._id });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

module.exports = router;
