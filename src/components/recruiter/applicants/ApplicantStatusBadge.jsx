const ApplicantStatusBadge = ({ status }) => {
  return <span className={`status-badge ${status}`}>{status}</span>;
};

export default ApplicantStatusBadge;
