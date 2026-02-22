import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="home-navbar">
      <div className="navbar-container">
        {/* Left - Logo */}
        <div onClick={() => navigate("/")}>
          <img src={logo} alt="Talentium Logo" className="home-navbar-logo" />
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
            onClick={() => navigate("/auth/candidate")}
          >
            Candidate Login
          </button>

          <button
            className="btn-primary"
            onClick={() => navigate("/auth/recruiter")}
          >
            Recruiter Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
