import axios from "axios";
import axiosInstance from "./axiosInstance";

// Usa la variable de entorno REACT_APP_API_URL
const BACKEND_URL = process.env.REACT_APP_API_URL;


export const getTiposMarcos = async () =>
  handleApiCall(() => axiosInstance.get(`/tipos`));

export const getTipoMarco = async (id) =>
  handleApiCall(() => axiosInstance.get(`/tipos/${id}`));

export const getCuentas = async () =>
  handleApiCall(() => axiosInstance.get(`/cuentas`));

export const patchCuenta = async (id, data) =>
  handleApiCall(() => axiosInstance.patch(`/cuentas/${id}`, data));

export const postCuenta = async (data) =>
  handleApiCall(() => axiosInstance.post(`/cuentas`, data));

// export const getItemsTransacciones = async () => await axios.get(`${BACKEND_URL}/api/items`);
export const authenticate = async (username, password) =>
  await axios.post(`${BACKEND_URL}/auth`, { username, password });

export const validate = async (token) =>
  await axios.post(`${BACKEND_URL}/auth/validate`, { token });
  
export const updateUser = async (newUserData) =>
  handleApiCall(() => axiosInstance.patch(`/usuarios/${newUserData.id}`, newUserData));

export const getPerfil = async () =>
  handleApiCall(() => axiosInstance.get(`/profile`));

export const registerUser = async (userData) =>
  handleApiCall(() => axiosInstance.post(`/usuarios`, userData));

// Utilidad para manejar llamadas a la API y errores
export async function handleApiCall(call) {
  try {
    const response = await call();
    return response.data;
  } catch (error) {
    if(error.response.data === "Invalid token") {
      console.log("Token inválido. Redirigiendo a la página de inicio de sesión...");
      window.location.href = "/login";
    }
    console.error(error);
    throw error; // Manejar el error
  }
}
