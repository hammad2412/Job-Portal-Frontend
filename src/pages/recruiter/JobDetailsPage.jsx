import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicationsByJob } from "../../services/recruiterApplication.service";
import ApplicantsTable from "../../components/recruiter/applicants/ApplicantsTable";
import "../../styles/recruiter/recruiterApplicants.css";

const JobDetailsPage = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  const limit = 5;

  useEffect(() => {
    fetchApplications();
  }, [page, status]);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getApplicationsByJob(jobId, {
        page,
        limit,
        status: status || undefined,
        sort: "-createdAt",
      });

      setApplications(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Applications</h2>

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => {
          setPage(1);
          setStatus(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="applied">Applied</option>
        <option value="reviewed">Reviewed</option>
        <option value="shortlisted">Shortlisted</option>
        <option value="rejected">Rejected</option>
      </select>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ApplicantsTable
          applications={applications}
          refetch={fetchApplications}
        />
      )}

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

export default JobDetailsPage;
