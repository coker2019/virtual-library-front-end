import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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

export const authAPI = {
  login: (credentials) => axiosInstance.post('/login', credentials),
  register: (userData) => axiosInstance.post('/register', userData),
};

export const booksAPI = {
  fetchBooks: () => axiosInstance.get('/books'),
  addBook: (bookData) => axiosInstance.post('/books', bookData),
};

export const borrowedBooksAPI = {
  fetchBorrowedBooks: () => axiosInstance.get('/borrowed-books'),
};

export const reservedBooksAPI = {
  fetchReservedBooks: () => axiosInstance.get('/reserved-books'),
};

export default axiosInstance;
