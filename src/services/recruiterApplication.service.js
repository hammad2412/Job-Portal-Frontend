import api from "../api/axios";

export const getJobApplications = async (jobId, params = {}) => {
  const response = await api.get(`/applications/jobs/${jobId}`, { params });
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.patch(`/applications/${applicationId}/status`, {
    status,
  });
  return response.data;
};

export const getApplicationsByJob = async (jobId, params = {}) => {
  const response = await api.get(`/applications/jobs/${jobId}`, {
    params,
  });
  return response.data;
};
