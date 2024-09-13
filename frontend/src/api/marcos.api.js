import axiosInstance from "./axiosInstance";
import { handleApiCall } from "./utils.api";

export const getMarcos = async () =>
  handleApiCall(() => axiosInstance.get(`/api/marcos`));

export const getMarco = async (id) =>
  handleApiCall(() => axiosInstance.get(`/api/marcos/${id}`));

export const postMarco = async (marco) =>
  handleApiCall(() => axiosInstance.post(`/api/marcos`, marco));

export const patchMarco = async (id, data) =>
  handleApiCall(() => axiosInstance.patch(`/api/marcos/${id}`, data));

export const deleteMarco = async (id) =>
  handleApiCall(() => axiosInstance.delete(`/api/marcos/${id}`));

