import { useState } from "react";
import { updateApplicationStatus } from "../../../services/recruiterApplication.service";
import ConfirmModal from "../shared/ConfirmModal";
import "../../../styles/recruiter/applicantActions.css";

const ApplicantActions = ({ applicationId, currentStatus, refetch }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const newStatus = e.target.value;

    if (newStatus === currentStatus) return;

    setPendingStatus(newStatus);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await updateApplicationStatus(applicationId, pendingStatus);
      setSelectedStatus(pendingStatus);
      setShowModal(false);
      refetch();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="applicant-actions">
      <select
        className="status-select"
        value={selectedStatus}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="applied">Applied</option>
        <option value="reviewed">Reviewed</option>
        <option value="shortlisted">Shortlisted</option>
        <option value="rejected">Rejected</option>
      </select>

      {showModal && (
        <ConfirmModal
          message={`Change status to "${pendingStatus}"?`}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ApplicantActions;
