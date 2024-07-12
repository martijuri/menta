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
