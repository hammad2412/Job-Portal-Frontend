import { useState } from "react";
import { updateJobStatus } from "../../../services/recruiterJob.service";
import ConfirmModal from "../shared/ConfirmModal";

const JobActionsDropdown = ({ jobId, currentStatus, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusChange = async () => {
    await updateJobStatus(jobId, selectedStatus);
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
        <option value="open">Open</option>
        <option value="paused">Paused</option>
        <option value="closed">Closed</option>
      </select>

      {showModal && (
        <ConfirmModal
          message={`Change job status to "${selectedStatus}"?`}
          onConfirm={handleStatusChange}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default JobActionsDropdown;
