const { exec } = require('child_process');
const path = require('path');
const Job = require('../models/Job');

async function runRScript(jobId) {
  const job = await Job.findById(jobId);

  if (!job) {
    console.error(`Job with ID ${jobId} not found.`);
    return;
  }

  // Define paths for the uploaded file and output result
  const uploadPath = path.join(__dirname, '..', 'uploads', job.filename);
  const resultPath = path.join(__dirname, '..', 'results', `${job.filename}_results.rds`);

  // Command to execute the R script
  const command = `Rscript process_seurat.R ${uploadPath} ${resultPath}`;

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`R script error: ${stderr}`);
      job.status = 'failed';
    } else {
      console.log(`R script output: ${stdout}`);
      job.status = 'completed';
      job.outputPath = resultPath;
    }
    await job.save();
  });
}

module.exports = runRScript;
