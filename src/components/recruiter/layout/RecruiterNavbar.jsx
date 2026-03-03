import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ConfirmModal from "../shared/ConfirmModal";
import "../../../styles/recruiter/recruiterNavbar.css";

const RecruiterNavbar = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutConfirm = () => {
    setShowModal(false);
    logout();
  };

  return (
    <>
      <header className="recruiter-navbar">
        <div className="navbar-left">
          <h1 className="navbar-title">Talentium Recruiter</h1>
        </div>

        <div className="navbar-right">
          <span className="recruiter-name">
            Hello, <strong>{user?.name || "Recruiter"}</strong>
          </span>

          <button
            onClick={() => setShowModal(true)}
            className="recruiter-logout-btn"
          >
            Logout
          </button>
        </div>
      </header>

      {showModal && (
        <ConfirmModal
          confirmText="Logout"
          cancelText="Stay Logged In"
          variant="primary"
          message="You will be Logged Out of your recruiter account. Continue?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RecruiterNavbar;
