import axios from "axios";

export const BASE_URL = process.env.REACT_APP_HIPNOS_BASE_URL || "http://127.0.0.1:8000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
