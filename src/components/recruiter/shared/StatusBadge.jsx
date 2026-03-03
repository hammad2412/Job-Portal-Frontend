import "../../../styles/recruiter/statusBadge.css";

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`status-badge status-${status}`}>{formattedStatus}</span>
  );
};

export default StatusBadge;
