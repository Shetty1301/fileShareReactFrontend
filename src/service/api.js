// service/api.js
import axios from 'axios';

const API_URI = 'https://fileshareflaskapp.onrender.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URI
});

// Add a request interceptor to add auth token to requests
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

// Auth APIs
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// File Upload API
export const uploadFile = async (data) => {
  try {
    const response = await api.post('/upload', data);
    return response.data;
  } catch (error) {
    console.log("Error")
    throw error.response ? error.response.data : error.message;
  }
};

// Get user's uploaded files
export const getUserFiles = async () => {
  try {
    const response = await api.get('/files-by-email');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete user's file
export const deleteFile = async (fileId) => {
  try {
    const response = await api.delete(`/my-uploads/${fileId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;