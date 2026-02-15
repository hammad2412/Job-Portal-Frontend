import { useNavigate } from "react-router-dom";
import "./How.css";

const How = () => {
  const navigate = useNavigate();

  return (
    <section className="how">
      <div className="how-container">
        <h2 className="how-title">How it works</h2>

        {/* Candidate Section */}
        <div className="how-block">
          <h3 className="how-subtitle">For Growth-Oriented Professionals</h3>

          <div className="how-steps">
            <div className="how-step">
              <div className="icon">📝</div>
              <p>Create Profile</p>
            </div>

            <div className="how-step">
              <div className="icon">📄</div>
              <p>Complete Resume</p>
            </div>

            <div className="how-step">
              <div className="icon">🔎</div>
              <p>Apply Jobs</p>
            </div>

            <div className="how-step">
              <div className="icon">📅</div>
              <p>Schedule Interview</p>
            </div>

            <div className="how-step">
              <div className="icon">🎉</div>
              <p>Get Hired</p>
            </div>
          </div>

          <button
            className="how-btn"
            onClick={() => navigate("/login/candidate")}
          >
            Start as Candidate
          </button>
        </div>

        {/* Recruiter Section */}
        <div className="how-block">
          <h3 className="how-subtitle-r">For Growing Businesses</h3>

          <div className="how-steps">
            <div className="how-step">
              <div className="icon">🏢</div>
              <p>Create Account</p>
            </div>

            <div className="how-step">
              <div className="icon">📢</div>
              <p>Post Job</p>
            </div>

            <div className="how-step">
              <div className="icon">🎯</div>
              <p>Filter Talent</p>
            </div>

            <div className="how-step">
              <div className="icon">🤝</div>
              <p>Interview</p>
            </div>

            <div className="how-step">
              <div className="icon">✅</div>
              <p>Hire Candidate</p>
            </div>
          </div>

          <button
            className="how-btn-r"
            onClick={() => navigate("/login/recruiter")}
          >
            Start Hiring
          </button>
        </div>
      </div>
    </section>
  );
};

export default How;
