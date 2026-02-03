import axios from "axios";
import { BASE_URL } from "./api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;



// api.interceptors.request.use((config) => {
//   const isAuthApi =
//     config.url.includes("/auth/login") ||
//     config.url.includes("/auth/register") ||
//     config.url.includes("/auth/forgot-password") ||
//     config.url.includes("/auth/reset-password");

//   if (!isAuthApi) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }


//   return config;
// });
