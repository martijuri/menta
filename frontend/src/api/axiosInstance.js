import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

// Crea una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
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