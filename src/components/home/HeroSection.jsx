import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      {" "}
      <div className="hero-inner">
        {" "}
        <h1 className="hero-title">
          {" "}
          A modern platform connecting companies with top talent.{" "}
        </h1>{" "}
        <p className="hero-subtitle">
          {" "}
          Built for professionals and organizations who value precision,
          efficiency, and meaningful hiring outcomes.{" "}
        </p>{" "}
        <div className="hero-buttons">
          {" "}
          <button
            className="hero-btn"
            onClick={() => navigate("/auth/candidate")}
          >
            {" "}
            Explore Opportunities{" "}
          </button>{" "}
          <button
            className="hero-btn"
            onClick={() => navigate("/auth/recruiter")}
          >
            {" "}
            Post a Position{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default HeroSection;
