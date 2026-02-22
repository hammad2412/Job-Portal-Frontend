import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";

const RecentJobs = ({ jobs }) => {
  return (
    <div className="recent-jobs">
      <h3>Recent Jobs</h3>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="recent-job-item">
              <div>
                <strong>{job.title}</strong>
                <span>{job.location}</span>
              </div>

              <div>
                <StatusBadge status={job.status} />
                <Link to={`/recruiter/jobs/${job._id}`}>View</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentJobs;
