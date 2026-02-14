import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="home-logo">JobPortal</div>

        <div className="nav-buttons">
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
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Abstract Elements */}
        <div className="abstract-shape shape-one"></div>
        <div className="abstract-shape shape-two"></div>

        <div className="hero-content">
          <h1 className="hero-heading">
            A modern platform connecting companies with top talent.
          </h1>

          <p className="hero-subtext">
            Designed for professionals and organizations who value clarity,
            efficiency, and meaningful opportunities.
          </p>

          <div className="hero-cta">
            <button
              className="btn-primary large"
              onClick={() => navigate("/login/candidate")}
            >
              Explore Opportunities
            </button>

            <button
              className="btn-outline large"
              onClick={() => navigate("/login/recruiter")}
            >
              Post a Position
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
