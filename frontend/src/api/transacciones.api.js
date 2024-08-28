import axiosInstance from "./axiosInstance";
import { handleApiCall } from "./utils.api";

export const getTransacciones = async () =>
  handleApiCall(() => axiosInstance.get(`/transacciones`));

export const getPedidos = async () =>
  handleApiCall(() => axiosInstance.get(`/pedidos`));

export const getVentas = async () =>
  handleApiCall(() => axiosInstance.get(`/ventas`));

export const getTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.get(`/transacciones/${id}`));

export const postTransaccion = async (transaccion) =>
  handleApiCall(() => axiosInstance.post(`/transacciones`, transaccion));

export const patchTransaccion = async (id, transaccion) =>
  handleApiCall(() => axiosInstance.patch(`/transacciones/${id}`, transaccion));

export const deleteTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.delete(`/transacciones/${id}`));

export const getItemTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.get(`/item/${id}`));

export const getItemsTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.get(`/items/${id}`));

export const postItemTransaccion = async (item) =>
  handleApiCall(() => axiosInstance.post(`/item`, item));

export const postItemsTransaccion = async (idTransaccionItemTransaccion, itemsTransaccion) =>
  handleApiCall(() => axiosInstance.post(`/items`, idTransaccionItemTransaccion, itemsTransaccion));

export const patchItemTransaccion = async (id, item) =>
  handleApiCall(() => axiosInstance.patch(`/item/${id}`, item));

export const deleteItemTransaccion = async (id) =>
  handleApiCall(() => axiosInstance.delete(`/item/${id}`));
