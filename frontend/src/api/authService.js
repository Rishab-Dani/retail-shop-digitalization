import api from "./axios";
import { BASE_URL } from "./api";


export const loginApi = async (email, password) => {
  const res = await api.post("/api/auth/login", {
    email,
    password,
  });

  return res.data; // { token }
};


export const registerApi = async (data) => {
  const res = await api.post("/api/auth/register", data); // ✅ FIXED
  return res.data;
};

export const forgotPasswordApi = async (email) => {
  const res = await api.post("/api/auth/forgot-password", { email });
  return res.data;
};


export const resetPasswordApi = async (token, newPassword) => {
  const res = await api.post("/api/auth/reset-password", {
    token,
    newPassword,
  });
  return res.data;
};


// export const loginApi = async (email, password) => {
//   const res = await api.post("/auth/login", {
//     email,
//     password,
//   });

 

//   return res.data; // { token: "..." }
// };

// const API_BASE = "http://192.168.1.3:8080/api/auth/login";
