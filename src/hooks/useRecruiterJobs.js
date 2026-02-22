import { useEffect, useState } from "react";
import { getMyJobs } from "../services/recruiterJob.service";

const useRecruiterJobs = (queryParams = {}) => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await getMyJobs(queryParams);

      setJobs(response.data); // ← FIXED
      setPagination(response.pagination); // ← FIXED
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    pagination,
    loading,
    error,
    refetch: fetchJobs,
  };
};

export default useRecruiterJobs;
