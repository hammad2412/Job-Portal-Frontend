import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import "./RecruiterLogin.css";

const RecruiterRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/register/recruiter", formData);
      navigate("/login/recruiter");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recruiter-auth-page">
      <div className="recruiter-auth-card">
        <h2 className="recruiter-auth-title">Recruiter Registration</h2>
        <p className="recruiter-auth-subtitle">
          Create an account to post positions and manage hiring.
        </p>

        {error && <div className="recruiter-auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="recruiter-auth-form">
          <input
            type="text"
            name="name"
            placeholder="Company or Recruiter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="recruiter-auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login/recruiter")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RecruiterRegister;
