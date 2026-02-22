import { useEffect, useState } from "react";
import api from "../../../api/axios";
import JobCard from "./JobCard";
import "./JobFeed.css";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const limit = 5;

  useEffect(() => {
    fetchJobs();
  }, [page, location, jobType]);

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const res = await api.get("/jobs", {
        params: {
          page,
          limit,
          location: location || undefined,
          jobType: jobType || undefined,
          sort: "-createdAt",
        },
      });

      setJobs(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch jobs");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="job-feed">
      <h2>Available Jobs</h2>

      {/* Filters */}
      <div className="job-filters">
        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => {
            setPage(1);
            setLocation(e.target.value);
          }}
        />

        <select
          value={jobType}
          onChange={(e) => {
            setPage(1);
            setJobType(e.target.value);
          }}
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {/* Job List */}
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      )}

      {/* Pagination */}
      <div className="pagination-controls">
        {pagination.prev && (
          <button onClick={() => setPage(page - 1)}>Prev</button>
        )}

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        {pagination.next && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default JobFeed;
