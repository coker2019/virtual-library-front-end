import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("base url", BASE_URL);

const setBaseUrl = (endpoint) => BASE_URL + endpoint;

const axiosInstance = axios.create({
  baseURL: setBaseUrl(""),
});

/**In this code, axiosInstance.interceptors.request.use()
 * is used to intercept the request before it is sent.
 * The Authorization header is set to the current authToken
 * from localStorage for each request. If the authToken
 * changes in localStorage, the updated token will be used
 * for the next request. */

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
