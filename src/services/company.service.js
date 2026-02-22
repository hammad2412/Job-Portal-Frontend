import api from "../api/axios";

export const createCompany = async (data) => {
  const response = await api.post("/company", data);
  return response.data;
};

export const getMyCompany = async () => {
  const response = await api.get("/company/me");
  return response.data;
};

export const updateCompany = async (data) => {
  const response = await api.put("/company", data);
  return response.data;
};
