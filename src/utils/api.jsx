import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error?.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
