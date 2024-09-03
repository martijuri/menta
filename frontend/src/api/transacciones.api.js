import axiosInstance from "./axiosInstance";
import { handleApiCall } from "./utils.api";

export const getTransacciones = async () =>
  handleApiCall(() => axiosInstance.get(`/api/transacciones`));

export const getPedidos = async () =>
  handleApiCall(() => axiosInstance.get(`/api/pedidos`));

export const getVentas = async () =>
  handleApiCall(() => axiosInstance.get(`/api/ventas`));

export const getTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.get(`/api/transacciones/${id}`));

export const postTransaccion = async (transaccion) =>
  handleApiCall(() => axiosInstance.post(`/api/transacciones`, transaccion));

export const patchTransaccion = async (id, transaccion) =>
  handleApiCall(() => axiosInstance.patch(`/api/transacciones/${id}`, transaccion));

export const deleteTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.delete(`/api/transacciones/${id}`));

export const getItemTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.get(`/api/item/${id}`));

export const getItemsTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.get(`/api/items/${id}`));

export const postItemTransaccion = async (item) =>
  handleApiCall(() => axiosInstance.post(`/api/item`, item));

export const postItemsTransaccion = async (idTransaccionItemTransaccion, itemsTransaccion) => {
  const data = {
    idTransaccionItemTransaccion,
    itemsTransaccion
  };
  return handleApiCall(() => axiosInstance.post(`/api/items`, data));
};

export const patchItemTransaccion = async (id, item) =>
  handleApiCall(() => axiosInstance.patch(`/api/item/${id}`, item));

export const deleteItemTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.delete(`/api/item/${id}`));
