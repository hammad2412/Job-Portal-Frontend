import { useEffect, useState } from "react";
import {
  deleteJob,
  getMyJobs,
  updateJobStatus,
} from "../../services/recruiterJob.service";
import { Link, useNavigate } from "react-router-dom";
import StatusBadge from "../../components/recruiter/shared/StatusBadge";
import ConfirmModal from "../../components/recruiter/shared/ConfirmModal";
import "../../styles/recruiter/jobsPage.css";

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [jobToDelete, setJobToDelete] = useState(null);

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

  const handleStatusChange = async (id, newStatus) => {
    await updateJobStatus(id, newStatus);
    fetchJobs();
  };

  const confirmDeleteJob = async () => {
    if (!jobToDelete) return;

    await deleteJob(jobToDelete._id);
    setJobToDelete(null);
    fetchJobs();
  };

  return (
    <>
      <div className="jobs-page">
        <div className="jobs-header">
          <h2>My Jobs</h2>

          <select
            className="jobs-filter"
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
        </div>

        <div className="jobs-table-wrapper">
          {loading ? (
            <div className="jobs-loading">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="jobs-empty">
              <p>No jobs found.</p>
            </div>
          ) : (
            <table className="jobs-table">
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

              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>
                      <Link
                        to={`/recruiter/jobs/${job._id}`}
                        className="job-title-link"
                      >
                        {job.title}
                      </Link>
                    </td>

                    <td>{job.location}</td>

                    <td>
                      <StatusBadge status={job.status} />
                    </td>

                    <td>{job.applicationsCount}</td>

                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>

                    <td className="job-actions">
                      <Link
                        to={`/recruiter/jobs/${job._id}`}
                        className="action-btn view-btn"
                      >
                        View
                      </Link>

                      <button
                        className="action-btn edit-btn"
                        onClick={() =>
                          navigate(`/recruiter/jobs/${job._id}/edit`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="action-btn status-btn"
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
                        className="action-btn delete-btn"
                        onClick={() => setJobToDelete(job)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="jobs-pagination">
          <button
            disabled={!pagination.prev}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            disabled={!pagination.next}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {jobToDelete && (
        <ConfirmModal
          message={`"${jobToDelete.title}" will be permanently deleted. This action cannot be undone.`}
          confirmText="Delete Job"
          cancelText="Cancel"
          variant="danger"
          onConfirm={confirmDeleteJob}
          onCancel={() => setJobToDelete(null)}
        />
      )}
    </>
  );
};

export default JobsPage;
