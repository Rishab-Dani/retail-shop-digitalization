import api from "./axios";
import { BASE_URL } from "./api";

// export const loginApi = async (email, password) => {
//   const res = await api.post("/auth/login", {
//     email,
//     password,
//   });

 

//   return res.data; // { token: "..." }
// };

// const API_BASE = "http://192.168.1.3:8080/api/auth/login";

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
