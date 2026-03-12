import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://devsquad26-93mh.vercel.app/api",
  withCredentials: true // JWT ya cookies ke liye
});

export default api;