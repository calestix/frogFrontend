// utils/api.js
import axiosInstance from "./axios";

// method = "get", "post", "put", "delete", etc.
export const apiCall = async (url, method = "get", data = {}, config = {}) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
