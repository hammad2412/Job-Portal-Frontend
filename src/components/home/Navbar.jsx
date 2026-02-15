import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left - Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          JobPortal
        </div>

        {/* Center - Navigation */}
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#how">How it works</a>
          <a href="#reviews">Reviews</a>
        </div>

        {/* Right - Buttons */}
        <div className="navbar-buttons">
          <button
            className="btn-outline"
            onClick={() => navigate("/login/candidate")}
          >
            Candidate Login
          </button>

          <button
            className="btn-primary"
            onClick={() => navigate("/login/recruiter")}
          >
            Recruiter Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
