import 'dotenv/config';
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://forgetradingandconstruction.com/api/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// 🔐 Request interceptor for Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const lang = sessionStorage.getItem("lang") || "en";
      config.headers["language"] = lang;
    }
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor for toast messages
axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error?.response?.data?.errors) {
        toast.error(error?.response?.data?.errors[0].message)
    //   error.response.data.errors.forEach(err => {
    //     toast.error(err.message);
    //   });
    } else if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error?.message) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }

    if(error.status=="401"){
      localStorage.removeItem("userData")
      localStorage.removeItem("token")
      window.location.href="/"
    }
  
    return Promise.reject(error);
  }
  
);

export default axiosInstance;

// baseURL: "https://forgetradingandconstruction.com/api",
// baseURL: "http://localhost:4005/api",
// Create instance
