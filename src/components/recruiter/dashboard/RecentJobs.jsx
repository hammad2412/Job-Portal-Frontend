import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";
import "../../../styles/recruiter/recentJobs.css";

const RecentJobs = ({ jobs }) => {
  return (
    <div className="recent-jobs">
      <div className="recent-jobs-header">
        <h3 className="recent-jobs-title">Recent Jobs</h3>
      </div>

      {jobs.length === 0 ? (
        <div className="recent-jobs-empty">
          <p>No jobs posted yet.</p>
          <span>Start by creating your first job posting.</span>
        </div>
      ) : (
        <div className="recent-jobs-list">
          {jobs.map((job) => (
            <div key={job._id} className="recent-job-card">
              <div className="recent-job-info">
                <h4 className="recent-job-title">{job.title}</h4>
                <p className="recent-job-location">{job.location}</p>
              </div>

              <div className="recent-job-actions">
                <StatusBadge status={job.status} />

                <Link
                  to={`/recruiter/jobs/${job._id}`}
                  className="recent-job-view-btn"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentJobs;
