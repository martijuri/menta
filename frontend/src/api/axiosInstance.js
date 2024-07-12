import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

// Crea una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`, 
  headers: {
	Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;