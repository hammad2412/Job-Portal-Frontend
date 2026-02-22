import homeBefore from "../../assets/home-before.webp";
import homeAfter from "../../assets/home-after.webp";
import "./ConnectSection.css";
import logo from "../../assets/logo.png";

const ConnectSection = () => {
  return (
    <section className="connect">
      <div className="connect-container">
        {/* Text Content */}
        <div className="connect-text">
          <h2 className="connect-title">
            Where companies and professionals connect with purpose.
          </h2>

          <p className="connect-subtitle">
            Our platform enables meaningful hiring by aligning qualified talent
            with forward-thinking organizations.
          </p>
        </div>

        {/* Comparison Images */}
        <div className="connect-images">
          <div className="connect-image-card">
            <div className="image-path">
              <p className="image-label">The usual path</p>
              <img src={homeBefore} alt="Traditional hiring path" />
            </div>
          </div>

          <div className="connect-image-card highlight">
            <img src={logo} alt="Talentium Logo" className="connection-logo" />
            <div className="image-path">
              <img src={homeAfter} alt="Modern hiring path" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
