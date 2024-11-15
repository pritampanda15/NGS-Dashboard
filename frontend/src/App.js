import React from 'react';
import FileUpload from './components/FileUpload';
import JobList from './components/JobList';

const App = () => (
  <div className="App">
    <h1>NGS Dashboard</h1>
    <FileUpload />
    <JobList />
  </div>
);

export default App;
