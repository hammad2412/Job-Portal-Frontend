import { useNavigate } from "react-router-dom";
import "./Benefits.css";

const Benefits = () => {
  const navigate = useNavigate();

  return (
    <section className="benefits-wrapper">
      <div className="benefits-container">
        {/* Candidate Card */}
        <div
          className="benefit-large candidate"
          onClick={() => navigate("/register/candidate")}
        >
          <p className="benefit-tag">Got Talent?</p>
          <h2>Build a career with clarity</h2>

          <ul>
            <li>🎯 Direct access to verified employers</li>
            <li>📊 Transparent opportunities & expectations</li>
            <li>⚡ Streamlined one-profile applications</li>
            <li>🔐 Trusted companies only</li>
            <li>🚀 Long-term career matching</li>
          </ul>

          <span className="benefit-cta">Start your journey →</span>
        </div>

        {/* Recruiter Card */}
        <div
          className="benefit-large recruiter"
          onClick={() => navigate("/register/recruiter")}
        >
          <p className="benefit-tag">Need Talent?</p>
          <h2>Hire with precision</h2>

          <ul>
            <li>📈 Access high-intent professionals</li>
            <li>🛠 Structured hiring workflow tools</li>
            <li>🧠 Intelligent candidate screening</li>
            <li>⏱ Reduced time-to-hire</li>
            <li>🔎 Precision talent discovery</li>
          </ul>

          <span className="benefit-cta">Start hiring →</span>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
