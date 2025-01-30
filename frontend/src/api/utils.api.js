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

export const authenticate = async (username, password) =>
  handleApiCall(() => axiosInstance.post(`/login`, { username, password }));

export const validate = async (token) =>
  handleApiCall(() => axiosInstance.post(`/auth/validate`, { token }));
  
export const updateUser = async (newUserData) =>
  handleApiCall(() => axiosInstance.patch(`/api/usuarios/${newUserData.id}`, newUserData));

export const getPerfil = async () =>
  handleApiCall(() => axiosInstance.get(`/api/profile`));

export const registerUser = async (userData) =>
  handleApiCall(() => axiosInstance.post(`/api/usuarios`, userData));

// Nueva función para generar el archivo Excel
export const generarPresupuestoExcel = async (data) => {
  try {
    const response = await axiosInstance.post(`/api/presupuesto`, data, {
      responseType: 'blob', // Importante para recibir el archivo como blob
    });

    // Generar el nombre del archivo dinámicamente
    const cliente = data.cliente.replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
    const fecha = new Date();
    const mes = fecha.toLocaleString('default', { month: 'long' });
    const año = fecha.getFullYear();
    const fileName = `Presupuesto_${cliente}_${mes}_${año}.xlsx`;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // Nombre del archivo dinámico
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error al generar el archivo Excel:', error);
    throw error;
  }
};

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