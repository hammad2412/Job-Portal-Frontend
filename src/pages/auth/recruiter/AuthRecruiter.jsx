import { useState } from "react";
import "./AuthRecruiter.css";
import bgImg from "../../../assets/auth-bg.png";

const AuthRecruiter = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="auth-recruiter-page">
      {/* LEFT SIDE */}
      <div
        className="auth-recruiter-page-left"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="overlay">
          <div className="auth-hero-text">
            <h2>Choose a job you love, and you never have to work a day.</h2>
            <p>- Confucius</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-recruiter-page-right">
        <div className={`auth-rec-wrapper ${isToggled ? "toggled" : ""}`}>
          <div className="auth-rec-background-shape"></div>
          <div className="auth-rec-secondary-shape"></div>

          {/* LOGIN */}
          <div className="auth-rec-credentials-panel signin">
            <h2 className="auth-rec-slide-element">Login</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="auth-rec-field-wrapper auth-rec-slide-element">
                <input type="text" required />
                <label>Email</label>
              </div>

              <div className="auth-rec-field-wrapper auth-rec-slide-element">
                <input type="password" required />
                <label>Password</label>
              </div>

              <div className="auth-rec-field-wrapper auth-rec-slide-element">
                <button className="auth-rec-submit-button">
                  Login
                </button>
              </div>

              <div className="auth-rec-switch-link auth-rec-slide-element">
                <p>
                  Don't have an account? <br />
                  <button
                    type="button"
                    onClick={() => setIsToggled(true)}
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="auth-rec-welcome-section signin">
            <h2>WELCOME BACK!</h2>
          </div>

          {/* REGISTER */}
          <div className="auth-rec-credentials-panel signup">
            <h2 className="auth-rec-slide-element">Register</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <input type="text" required />
                <label>Full Name</label>
              </div>

              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <input type="text" required />
                <label>Email</label>
              </div>

              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <input type="password" required />
                <label>Password</label>
              </div>

              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <button className="auth-rec-submit-button-r">
                  Register
                </button>
              </div>

              <div className="auth-rec-switch-link-r auth-rec-slide-element">
                <p>
                  Already have an account? <br />
                  <button
                    type="button"
                    onClick={() => setIsToggled(false)}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="auth-rec-welcome-section signup">
            <h2>WELCOME!</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRecruiter;
