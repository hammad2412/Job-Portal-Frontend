import api from "../api/axios";

export const parseResume = async (formData) => {
  const response = await api.post(
    "/candidate-profile/upload-resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const upsertCandidateProfile = async (profileData) => {
  const response = await api.put("/candidate-profile", profileData);

  return response.data;
};

export const getCandidateProfile = async () => {
  const response = await api.get("/candidate-profile/me");

  return response.data;
};
