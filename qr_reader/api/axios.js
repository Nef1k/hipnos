import axios from "axios";

export const BASE_URL = process.env.REACT_APP_HIPNOS_BASE_URL || "http://192.168.1.160:8000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
