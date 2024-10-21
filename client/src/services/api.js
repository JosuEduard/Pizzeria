// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funciones para las llamadas a la API
export const login = (email, password) => api.post('/user/login', { email, password });
export const signup = (userData) => api.post('/user/signup', userData);
export const checkToken = () => api.get('/user/checkToken');
export const getDashboardDetails = () => api.get('/dashboard/details');
export const getProducts = () => api.get('/product/get');
export const getCategories = () => api.get('/category/get');
export const getUsers = () => api.get('/user/get');

export default api;
