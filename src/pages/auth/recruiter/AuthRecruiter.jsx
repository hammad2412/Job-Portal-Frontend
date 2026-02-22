import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../api/axios";
import "./AuthRecruiter.css";
import bgImg from "../../../assets/auth-bg.png";

const AuthRecruiter = () => {
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

      if (user.role !== "recruiter") {
        setError("This account is not registered as a recruiter.");
        setLoading(false);
        return;
      }

      if (!user.companyId) {
        navigate("/recruiter/company-profile");
      } else {
        navigate("/recruiter");
      }
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
      await api.post("/auth/register/recruiter", registerData);

      setIsToggled(false);
      setRegisterData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-recruiter-page">
      {/* LEFT SIDE */}
      <div
        className="auth-recruiter-page-left"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="overlay">
          <div className="auth-hero-text">
            <h2>Hire smarter. Build stronger teams.</h2>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-recruiter-page-right">
        <div className={`auth-rec-wrapper ${isToggled ? "toggled" : ""}`}>
          <div className="auth-rec-background-shape"></div>
          <div className="auth-rec-secondary-shape"></div>

          {/* ================= LOGIN PANEL ================= */}
          <div className="auth-rec-credentials-panel signin">
            <h2 className="auth-rec-slide-element">Recruiter Login</h2>

            {error && !isToggled && (
              <div className="auth-rec-error">{error}</div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div className="auth-rec-field-wrapper auth-rec-slide-element">
                <input
                  type="text"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
                <label>Email</label>
              </div>

              <div className="auth-rec-field-wrapper auth-rec-slide-element">
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <label>Password</label>
              </div>

              <div className="auth-rec-field-wrapper auth-rec-slide-element">
                <button className="auth-rec-submit-button" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </button>
              </div>

              <div className="auth-rec-switch-link auth-rec-slide-element">
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

          <div className="auth-rec-welcome-section signin">
            <h2>WELCOME BACK!</h2>
          </div>

          {/* ================= REGISTER PANEL ================= */}
          <div className="auth-rec-credentials-panel signup">
            <h2 className="auth-rec-slide-element">Recruiter Register</h2>

            {error && isToggled && (
              <div className="auth-rec-error">{error}</div>
            )}

            <form onSubmit={handleRegisterSubmit}>
              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
                <label>Full Name</label>
              </div>

              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <input
                  type="text"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                <label>Email</label>
              </div>

              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
                <label>Password</label>
              </div>

              <div className="auth-rec-field-wrapper-r auth-rec-slide-element">
                <button className="auth-rec-submit-button-r" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </button>
              </div>

              <div className="auth-rec-switch-link-r auth-rec-slide-element">
                <p>
                  Already have an account? <br />
                  <button
                    type="button"
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

          <div className="auth-rec-welcome-section signup">
            <h2>WELCOME!</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRecruiter;
