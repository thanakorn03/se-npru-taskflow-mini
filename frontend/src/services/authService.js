import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/auth`,
});

// Register user
const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/login', userData);
  return response.data;
};

// Get current user
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get('/me', config);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  getMe,
  logout,
};

export default authService;
