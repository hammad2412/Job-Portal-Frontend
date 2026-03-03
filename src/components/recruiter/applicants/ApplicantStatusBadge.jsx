import "../../../styles/recruiter/applicantStatusBadge.css";

const ApplicantStatusBadge = ({ status }) => {
  if (!status) return null;

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`applicant-status-badge status-${status}`}>
      {formattedStatus}
    </span>
  );
};

export default ApplicantStatusBadge;
