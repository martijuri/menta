import axios from "axios";

export const getTiposMarcos = async () => await axios.get("http://localhost:4000/api/tipos");
// export const getItemsTransacciones = async () => await axios.get("http://localhost:4000/api/items");
export const authenticate = async (username, password) => await axios.post("http://localhost:4000/auth", { username, password });