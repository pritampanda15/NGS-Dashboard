const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  outputPath: String,
});

module.exports = mongoose.model('Job', jobSchema);
