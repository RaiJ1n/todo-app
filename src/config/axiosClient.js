import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/todo',
  withCredentials: true,
  
});

export default apiClient;















