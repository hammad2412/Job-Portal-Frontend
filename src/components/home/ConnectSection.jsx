import homeBefore from "../../assets/home-before.webp";
import homeAfter from "../../assets/home-after.webp";
import "./ConnectSection.css";

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
            <p className="image-label">The usual path</p>
            <img src={homeBefore} alt="Traditional hiring path" />
          </div>

          <div className="connect-image-card highlight">
            <p className="image-label">JobPortal</p>
            <img src={homeAfter} alt="Modern hiring path" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
