import { useEffect, useState } from "react";
import { getJobApplications } from "../services/recruiterApplication.service";

const useJobApplications = (jobId) => {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getJobApplications(jobId);
      setApplications(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId]);

  return {
    applications,
    pagination,
    loading,
    error,
    refetch: fetchApplications,
  };
};

export default useJobApplications;
