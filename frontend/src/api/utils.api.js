import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "http://localhost:4000";

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

// export const getItemsTransacciones = async () => await axios.get(`${BASE_URL}/api/items`);
export const authenticate = async (username, password) =>
  await axios.post(`${BASE_URL}/auth`, { username, password });

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
