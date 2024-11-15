import React, { useEffect, useState } from 'react';
import api from '../api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data); // Make sure response.data is an array of jobs
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
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
      )}
    </div>
  );
};

export default JobList;
