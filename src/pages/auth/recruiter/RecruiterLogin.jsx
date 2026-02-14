import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./RecruiterLogin.css";

const RecruiterLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);

      if (user.role !== "recruiter") {
        setError("This account is not registered as a recruiter.");
        return;
      }

      navigate("/recruiter/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recruiter-auth-page">
      <div className="recruiter-auth-card">
        <h2 className="recruiter-auth-title">Recruiter Login</h2>
        <p className="recruiter-auth-subtitle">
          Sign in to manage job postings and candidates.
        </p>

        {error && <div className="recruiter-auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="recruiter-auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="recruiter-auth-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="recruiter-auth-footer">
          Dont have an account?{" "}
          <span onClick={() => navigate("/register/recruiter")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;
