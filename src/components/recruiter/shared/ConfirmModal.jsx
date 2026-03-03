import "../../../styles/recruiter/confirmModal.css";

const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary", // primary | danger
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Confirm Action</h3>

        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className={`modal-btn ${
              variant === "danger"
                ? "confirm-danger-btn"
                : "confirm-primary-btn"
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
