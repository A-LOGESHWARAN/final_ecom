import axios from "axios";

const api = axios.create({
  baseURL: "https://final-ecom-au0f.onrender.com/api"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // ✅ important
  }
  return config;
});

export default api;
