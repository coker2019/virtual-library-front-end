import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com', // Ensure the base URL is correct
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another secure place
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
