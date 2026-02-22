import { useState } from "react";
import { updateApplicationStatus } from "../../../services/recruiterApplication.service";
import ConfirmModal from "../shared/ConfirmModal";

const ApplicantActions = ({ applicationId, currentStatus, refetch }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = async () => {
    await updateApplicationStatus(applicationId, selectedStatus);
    setShowModal(false);
    refetch();
  };

  return (
    <>
      <select
        value={currentStatus}
        onChange={(e) => {
          setSelectedStatus(e.target.value);
          setShowModal(true);
        }}
      >
        <option value="applied">Applied</option>
        <option value="reviewed">Reviewed</option>
        <option value="shortlisted">Shortlisted</option>
        <option value="rejected">Rejected</option>
      </select>

      {showModal && (
        <ConfirmModal
          message={`Change status to "${selectedStatus}"?`}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ApplicantActions;
