import axios from 'axios';

// Variable de entorno REACT_APP_API_URL
const BACKEND_URL = process.env.REACT_APP_API_URL;

// Crea una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// Interceptor para actualizar el header Authorization antes de cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;