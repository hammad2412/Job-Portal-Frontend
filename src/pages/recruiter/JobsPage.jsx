import { useEffect, useState } from "react";
import {
  deleteJob,
  getMyJobs,
  updateJobStatus,
} from "../../services/recruiterJob.service";
import { Link, useNavigate } from "react-router-dom";

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const limit = 5;

  useEffect(() => {
    fetchJobs();
  }, [page, status]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getMyJobs({
        page,
        limit,
        status: status || undefined,
        sort: "-createdAt",
      });

      setJobs(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateJobStatus(id, status);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/recruiter/jobs/${id}/edit`);
  };

  return (
    <div>
      <h2>My Jobs</h2>

      {/* Filter */}
      <select
        value={status}
        onChange={(e) => {
          setPage(1);
          setStatus(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="paused">Paused</option>
      </select>

      {loading && <p>Loading...</p>}

      <table style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Status</th>
            <th>Applications</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* <select onChange={(e) => setSort(e.target.value)}>
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
        </select> */}

        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>
                <Link to={`/recruiter/jobs/${job._id}`}>{job.title}</Link>
              </td>

              <td>{job.location}</td>

              <td>{job.status}</td>

              <td>{job.applicationsCount}</td>

              <td>{new Date(job.createdAt).toLocaleDateString()}</td>

              <td>
                <Link to={`/recruiter/jobs/${job._id}`}>Applications</Link>

                <button onClick={() => handleEdit(job._id)}>Edit</button>

                <button
                  onClick={() =>
                    handleStatusChange(
                      job._id,
                      job.status === "open" ? "paused" : "open",
                    )
                  }
                >
                  {job.status === "open" ? "Pause" : "Open"}
                </button>

                <button
                  style={{ color: "red" }}
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
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

export default JobsPage;
