import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "http://localhost:4000";

export const getTiposMarcos = async () =>
  handleApiCall(() => axiosInstance.get(`/tipos`));

export const getTipoMarco = async (id) =>
  handleApiCall(() => axiosInstance.get(`/tipos/${id}`));

// export const getItemsTransacciones = async () => await axios.get(`${BASE_URL}/api/items`);
export const authenticate = async (username, password) =>
  await axios.post(`${BASE_URL}/auth`, { username, password });

// Utilidad para manejar llamadas a la API y errores
export async function handleApiCall(call) {
  try {
    const response = await call();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Manejar el error
  }
}
