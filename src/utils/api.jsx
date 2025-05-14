import axios from 'axios';

const api = axios.create({
  baseURL: 'http://xpp-laravel:8080/api', 
});


export default api;
