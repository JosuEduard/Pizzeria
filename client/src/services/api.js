import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const login = (email, password) => api.post('/user/login', { email, password });
export const signup = (userData) => api.post('/user/signup', userData);
export const getDashboardDetails = () => api.get('/dashboard/details');
export const getProducts = () => api.get('/product/get');
export const getCategories = () => api.get('/category/get');
export const getUsers = () => api.get('/user/get');
// Añade aquí más funciones para otras llamadas a la API según sea necesario

export default api;