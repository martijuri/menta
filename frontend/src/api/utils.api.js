import axiosInstance from "./axiosInstance";

export const getTiposMarcos = async () =>
  handleApiCall(() => axiosInstance.get(`/api/tipos`));

export const getTipoMarco = async (id) =>
  handleApiCall(() => axiosInstance.get(`/api/tipos/${id}`));

export const getCuentas = async () =>
  handleApiCall(() => axiosInstance.get(`/api/cuentas`));

export const patchCuenta = async (id, cuenta) =>
  handleApiCall(() => axiosInstance.patch(`/api/cuentas/${id}`, cuenta));

export const postCuenta = async (data) =>
  handleApiCall(() => axiosInstance.post(`/api/cuentas`, data));

// export const getItemsTransacciones = async () => await axios.get(`${BACKEND_URL}/api/items`);
export const authenticate = async (username, password) =>
  handleApiCall(() => axiosInstance.post(`/auth`, { username, password }));

export const validate = async (token) =>
  handleApiCall(() => axiosInstance.post(`/auth/validate`, { token }));
  
export const updateUser = async (newUserData) =>
  handleApiCall(() => axiosInstance.patch(`/api/usuarios/${newUserData.id}`, newUserData));

export const getPerfil = async () =>
  handleApiCall(() => axiosInstance.get(`/api/profile`));

export const registerUser = async (userData) =>
  handleApiCall(() => axiosInstance.post(`/api/usuarios`, userData));

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
