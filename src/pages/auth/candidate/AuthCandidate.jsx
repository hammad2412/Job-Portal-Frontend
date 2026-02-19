import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../api/axios";
import "./AuthCandidate.css";
import bgImg from "../../../assets/auth-bg.png";

const AuthCandidate = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isToggled, setIsToggled] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= HANDLE CHANGE ================= */

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= LOGIN SUBMIT ================= */

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(loginData.email, loginData.password);

      if (user.role !== "candidate") {
        setError("This account is not registered as a candidate.");
        setLoading(false);
        return;
      }

      navigate("/candidate");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  /* ================= REGISTER SUBMIT ================= */

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/register/candidate", registerData);

      // After successful registration → switch to login
      setIsToggled(false);
      setRegisterData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-candidate-page">
      {/* LEFT SIDE IMAGE */}
      <div
        className="auth-candidate-page-left"
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
      <div className="auth-candidate-page-right">
        <div className={`auth-wrapper ${isToggled ? "toggled" : ""}`}>
          <div className="background-shape"></div>
          <div className="secondary-shape"></div>

          {/* {error && <div className="auth-error-global">{error}</div>} */}

          {/* ================= LOGIN PANEL ================= */}
          <div className="credentials-panel signin">
            <h2 className="slide-element">Login</h2>

            {error && !isToggled && <div className="auth-error">{error}</div>}

            <form onSubmit={handleLoginSubmit}>
              <div className="field-wrapper slide-element">
                <input
                  type="text"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
                <label>Email</label>
              </div>

              <div className="field-wrapper slide-element">
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <label>Password</label>
              </div>

              <div className="field-wrapper slide-element">
                <button className="submit-button" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </button>
              </div>

              <div className="switch-link slide-element">
                <p>
                  Don't have an account? <br />
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setIsToggled(true);
                    }}
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="welcome-section signin">
            <h2>WELCOME BACK!</h2>
          </div>

          {/* ================= REGISTER PANEL ================= */}
          <div className="credentials-panel signup">
            <h2 className="slide-element">Register</h2>

            {error && isToggled && <div className="auth-error-r">{error}</div>}

            <form onSubmit={handleRegisterSubmit}>
              <div className="field-wrapper-r slide-element">
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
                <label>Full Name</label>
              </div>

              <div className="field-wrapper-r slide-element">
                <input
                  type="text"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                <label>Email</label>
              </div>

              <div className="field-wrapper-r slide-element">
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
                <label>Password</label>
              </div>

              <div className="field-wrapper-r slide-element">
                <button className="submit-button-r" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </button>
              </div>

              <div className="switch-link-r slide-element">
                <p>
                  Already have an account? <br />
                  <button
                    type="button"
                    className="login-trigger"
                    onClick={() => {
                      setError("");
                      setIsToggled(false);
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="welcome-section signup">
            <h2>WELCOME!</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCandidate;
