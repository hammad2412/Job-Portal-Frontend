import { useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo-white.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-column">
          <img src={logo} alt="Talentium Logo" />
          <p className="footer-description">
            A modern hiring platform connecting professionals and
            forward-thinking organizations.
          </p>
        </div>

        {/* Candidates */}
        <div className="footer-column">
          <h4>Candidates</h4>
          <ul>
            <li onClick={() => navigate("/auth/candidate")}>Login</li>
            <li onClick={() => navigate("/auth/candidate")}>Register</li>
            <li>Browse Jobs</li>
            <li>Career Resources</li>
          </ul>
        </div>

        {/* Recruiters */}
        <div className="footer-column">
          <h4>Recruiters</h4>
          <ul>
            <li onClick={() => navigate("/auth/recruiter")}>Login</li>
            <li onClick={() => navigate("/auth/recruiter")}>Register</li>
            <li>Post a Job</li>
            <li>Hiring Solutions</li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
