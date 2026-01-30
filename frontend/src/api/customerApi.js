// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export const getMyProfile = () => API.get("/customers/me");
// export const getMyOrders = () => API.get("/customers/me/orders");
// export const getMyAddresses = () => API.get("/customers/me/addresses");
// export const updateProfile = (data) =>
//   API.put("/customers/me", data);

import api from "./axios";

// Backend-confirmed endpoints
export const getMyProfile = () =>
  api.get("/api/customer/profile");

export const getMyOrders = (params) =>
  api.get("/api/customer/orders", { params });

export const getMyAddresses = () =>
  api.get("/api/customer/addresses");

export const updateProfile = (data) =>
  api.put("/api/customer/profile", data);
