import api from "./axios";

export const loginApi = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

 

  return res.data; // { token: "..." }
};

export  const registerApi = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};