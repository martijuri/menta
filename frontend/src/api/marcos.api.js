import axiosInstance from "./axiosInstance";
import { handleApiCall } from "./utils.api";

export const getMarcos = async () =>
  handleApiCall(() => axiosInstance.get(`/marcos`));

export const getMarco = async (id) =>
  handleApiCall(() => axiosInstance.get(`/marcos/${id}`));

export const postMarco = async (marco) =>
  handleApiCall(() => axiosInstance.post(`/marcos`, marco));

export const patchMarco = async (id, marco) =>
  handleApiCall(() => axiosInstance.patch(`/marcos/${id}`, marco));

export const deleteMarco = async (id) =>
  handleApiCall(() => axiosInstance.delete(`/marcos/${id}`));

