import React, { useState, useEffect } from 'react';
import api from '../api';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [jobs, setJobs] = useState([]); // State for job list

  // Function to fetch the list of jobs
  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs'); // Fetch all jobs
      setJobs(response.data); // Update the job list state
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  useEffect(() => {
    // Fetch jobs on component mount
    fetchJobs();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(''); // Reset the status message when a new file is selected
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Attempt file upload
      const uploadResponse = await api.post('/files/upload', formData);
      const filename = uploadResponse.data.file.filename;
      setUploadStatus('File uploaded successfully');
      console.log('File uploaded:', uploadResponse.data);

      // Create job for the uploaded file
      try {
        const jobResponse = await api.post('/jobs/create', { filename });
        console.log('Job created:', jobResponse.data);
        setUploadStatus('File uploaded and job created successfully');

        // Fetch updated job list after creating a new job
        fetchJobs();
      } catch (jobError) {
        console.error('Error creating job:', jobError);
        setUploadStatus('File uploaded, but failed to create job');
      }
    } catch (uploadError) {
      console.error('Error uploading file:', uploadError);
      setUploadStatus('Failed to upload file');
    }
  };

  return (
    <div>
      <h1>NGS Dashboard</h1> {/* Single header */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File & Start Job</button>
      <p>{uploadStatus}</p> {/* Display the status message */}
      
      <h2>Job List</h2> {/* Job list header */}
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job._id}>
              {job.filename} - Status: {job.status}
            </li>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </ul>
    </div>
  );
};

export default FileUpload;
