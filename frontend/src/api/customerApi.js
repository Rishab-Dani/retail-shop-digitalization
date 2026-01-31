import api from "./axios";

/* PROFILE */
export const getMyProfile = () =>
  api.get("/api/customer/profile");

export const updateProfile = (data) =>
  api.put("/api/customer/profile", data);

/* ORDERS */
export const getMyOrders = () =>
  api.get("/api/customer/orders");

/* ADDRESSES */
export const getMyAddresses = () =>
  api.get("/api/customer/addresses");

export const createAddress = (data) =>
  api.post("/api/customer/addresses", data);

export const updateAddress = (id, data) =>
  api.put(`/api/customer/addresses/${id}`, data);

export const removeAddress = (id) =>
  api.delete(`/api/customer/addresses/${id}`);

