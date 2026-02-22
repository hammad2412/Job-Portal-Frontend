import api from "../api/axios";

export const getMyJobs = async (params = {}) => {
  const res = await api.get("/jobs/my-jobs", { params });
  return res.data;
};

export const createJob = async (data) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

export const getSingleJob = async (jobId) => {
  const res = await api.get(`/jobs/${jobId}`);
  return res.data;
};

export const updateJobStatus = async (jobId, status) => {
  const res = await api.patch(`/jobs/${jobId}/status`, { status });
  return res.data;
};

export const updateJob = async (jobId, data) => {
  const res = await api.put(`/jobs/${jobId}`, data);
  return res.data;
};

export const deleteJob = async (jobId) => {
  const res = await api.delete(`/jobs/${jobId}`);
  return res.data;
};
