import "./JobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">
            <span>at </span>
            {job.companyId?.name || "Company"}
          </p>
        </div>
      </div>

      <div className="job-card-body">
        <p>📍 {job.location}</p>
        <p>💼 {job.jobType}</p>
        <p>⭐ {job.experienceLevel}</p>
        {job.salaryRange && <p>💰 {job.salaryRange}</p>}
      </div>

      <div className="job-card-footer">
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>
  );
};

export default JobCard;
