import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;















