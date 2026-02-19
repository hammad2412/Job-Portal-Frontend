import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./CandidateNavbar.css";
import { useAuth } from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";

const CandidateNavbar = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="candidate-navbar">
      {/* ===== Left (Logo) ===== */}
      <NavLink to="/candidate/dashboard">
        <div className="navbar-left">
          <img src={logo} alt="Talentium Logo" className="navbar-logo" />
        </div>
      </NavLink>

      {/* ===== Center Links ===== */}
      <div className="navbar-center">
        <NavLink
          to="/candidate/applied"
          className={({ isActive }) =>
            isActive ? "navbar-link active-link" : "navbar-link"
          }
        >
          Applied Jobs
        </NavLink>

        <NavLink
          to="/candidate/saved"
          className={({ isActive }) =>
            isActive ? "navbar-link active-link" : "navbar-link"
          }
        >
          Saved Jobs
        </NavLink>
      </div>

      {/* ===== Right Profile ===== */}
      <div className="navbar-right">
        <div className="profile-wrapper" onClick={() => setOpen(!open)}>
          <div className="profile-avatar">C</div>

          {open && (
            <div className="profile-dropdown">
              <NavLink to="/candidate/profile">Profile</NavLink>

              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CandidateNavbar;
