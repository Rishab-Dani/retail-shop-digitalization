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


/* ADDRESS APIs */
export const createAddress = (data) =>
  api.post("/customers/me/addresses", data);

export const updateAddress = (id, data) =>
  api.put(`/customers/me/addresses/${id}`, data);

export const removeAddress = (id) =>
  api.delete(`/customers/me/addresses/${id}`);

