import { useState } from "react";
// import "./AuthRecruiter.css";
import bgImg from "../../../assets/auth-bg.png";

const AuthRecruiter = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="auth-recruiter-page">
      {/* LEFT SIDE (STATIC IMAGE) */}
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

      {/*Wrapper*/}
      <div className="auth-recruiter-page-right">
        <div className={`auth-wrapper ${isToggled ? "toggled" : ""}`}>
          <div className="background-shape"></div>
          <div className="secondary-shape"></div>

          {/* LOGIN PANEL */}
          <div className="credentials-panel signin">
            <h2 className="slide-element">Login</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field-wrapper slide-element">
                <input type="text" required />
                <label>Email</label>
                <i className="fa-solid l fa-user"></i>
              </div>

              <div className="field-wrapper slide-element">
                <input type="password" required />
                <label>Password</label>
                <i className="fa-solid l fa-lock"></i>
              </div>

              <div className="field-wrapper slide-element">
                <button className="submit-button" type="submit">
                  Login
                </button>
              </div>

              <div className="switch-link slide-element">
                <p>
                  Don't have an account? <br />
                  <button
                    type="button"
                    className="register-trigger"
                    onClick={() => setIsToggled(true)}
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="welcome-section signin">
            <h2 className="slide-element">WELCOME BACK!</h2>
          </div>

          {/* SIGNUP PANEL */}
          <div className="credentials-panel signup">
            <h2 className="slide-element">Register</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field-wrapper-r slide-element">
                <input type="text" required />
                <label>Full Name</label>
                <i className="fa-solid fa-user"></i>
              </div>

              <div className="field-wrapper-r slide-element">
                <input type="text" required />
                <label>Email</label>
                <i className="fa-solid fa-envelope"></i>
              </div>

              <div className="field-wrapper-r slide-element">
                <input type="password" required />
                <label>Password</label>
                <i className="fa-solid fa-lock"></i>
              </div>

              <div className="field-wrapper-r slide-element">
                <button className="submit-button-r" type="submit">
                  Register
                </button>
              </div>

              <div className="switch-link-r slide-element">
                <p>
                  Already have an account? <br />
                  <button
                    type="button"
                    className="login-trigger"
                    onClick={() => setIsToggled(false)}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="welcome-section signup">
            <h2 className="slide-element">WELCOME!</h2>
          </div>
        </div>
      </div>

      {/* <div className="auth-footer">
        <p>
        Made with ❤️ by{" "}
        <a href="#" target="_blank" rel="noreferrer">
            CodeZenithAI
          </a>
        </p>
      </div> */}
    </div>
  );
};

export default AuthRecruiter;
