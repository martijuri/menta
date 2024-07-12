import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getTiposMarcos = async () => await axios.get(`${BASE_URL}/api/tipos`);
// export const getItemsTransacciones = async () => await axios.get(`${BASE_URL}/api/items`);
export const authenticate = async (username, password) => await axios.post(`${BASE_URL}/auth`, { username, password });