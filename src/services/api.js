import axios from "axios";

const api = axios.create({
  baseURL: "https://devsquad26-93mh.vercel.app/api"
});

export default api;
 