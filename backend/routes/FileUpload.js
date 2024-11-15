//import React, { useState } from 'react';
//import axios from 'axios';
//
//const FileUpload = () => {
//  const [file, setFile] = useState(null);
//
//  const handleFileChange = (e) => {
//    setFile(e.target.files[0]);
//  };
//
//  const handleFileUpload = async () => {
//    const formData = new FormData();
//    formData.append('file', file); // Key 'file' matches backend's `upload.single('file')`
//
//    try {
//      const response = await axios.post('http://localhost:5001/api/files/upload', formData, {
//        headers: { 'Content-Type': 'multipart/form-data' },
//      });
//      console.log(response.data);
//    } catch (error) {
//      console.error('Error uploading file:', error);
//    }
//  };
//
//  return (
//    <div>
//      <input type="file" onChange={handleFileChange} />
//      <button onClick={handleFileUpload}>Upload File</button>
//    </div>
//  );
//};
//
//export default FileUpload;

import React, { useState, useEffect } from 'react';
import api from '../api';
import JobList from './JobList';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data); // Set jobs state with the list of jobs
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload file and create job
      const uploadResponse = await api.post('/files/upload', formData);
      setUploadStatus('File uploaded and job created successfully');
      
      // Fetch updated list of jobs
      fetchJobs();
    } catch (error) {
      console.error('Error uploading file or creating job:', error);
      setUploadStatus('Failed to upload file or create job');
    }
  };

  // Fetch jobs on component mount to display existing jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>NGS Dashboard</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File & Start Job</button>
      <p>{uploadStatus}</p>
      <h2>Job List</h2>
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
