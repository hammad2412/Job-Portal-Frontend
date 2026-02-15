import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-column">
          <h2 className="footer-logo">JobPortal</h2>
          <p className="footer-description">
            A modern hiring platform connecting professionals and
            forward-thinking organizations.
          </p>
        </div>

        {/* Candidates */}
        <div className="footer-column">
          <h4>Candidates</h4>
          <ul>
            <li onClick={() => navigate("/login/candidate")}>Login</li>
            <li onClick={() => navigate("/register/candidate")}>Register</li>
            <li>Browse Jobs</li>
            <li>Career Resources</li>
          </ul>
        </div>

        {/* Recruiters */}
        <div className="footer-column">
          <h4>Recruiters</h4>
          <ul>
            <li onClick={() => navigate("/login/recruiter")}>Login</li>
            <li onClick={() => navigate("/register/recruiter")}>Register</li>
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
    </footer>
  );
};

export default Footer;
