import api from "./axios";

export const loginApi = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

 

  return res.data; // { token: "..." }
};


export const registerApi = async (data) => {
  const res = await api.post("/api/auth/register", data); // ✅ FIXED
  return res.data;
};
