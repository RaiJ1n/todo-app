import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/todo',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;















