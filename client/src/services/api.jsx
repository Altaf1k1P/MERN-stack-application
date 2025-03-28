import axios from 'axios';

// Base API instance
const api = axios.create({
    baseURL: 'http://localhost:5500/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
