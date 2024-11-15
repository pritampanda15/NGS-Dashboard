const express = require('express');
const Job = require('../models/Job');
const runRScript = require('../utils/runRScript');
const router = express.Router();

// Create a new job
router.post('/create', async (req, res) => {
  const { filename } = req.body;

  try {
    const job = new Job({ filename, status: 'pending' });
    await job.save();

    // Start the R script process
    runRScript(job._id);

    res.status(201).json({ message: 'Job created successfully', jobId: job._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find(); // Retrieve all jobs from MongoDB
    res.json(jobs); // Send back as an array
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Check job status by ID
router.get('/:id/status', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json({ jobId: job._id, status: job.status, outputPath: job.outputPath });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve job status' });
  }
});

module.exports = router;
