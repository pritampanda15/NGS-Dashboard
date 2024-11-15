import React, { useEffect, useState } from 'react';
import api from '../api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        console.log('API response data:', response.data); // Log to inspect data structure
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs');
      }
    };
    fetchJobs();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Job List</h2>
      <ul>
        {Array.isArray(jobs) ? (
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

export default JobList;
