import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Ensure this URL matches your backend
});

export default api;
