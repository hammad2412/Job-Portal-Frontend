import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, role } = formData;

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
      const endpoint =
        role === "candidate"
          ? "/auth/register/candidate"
          : "/auth/register/recruiter";

      const res = await api.post(endpoint, {
        name,
        email,
        password,
      });

      const { accessToken, user } = res.data;

      setAccessToken(accessToken);

      // redirect based on role
      if (user.role === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }
    } catch (err) {
      console.log("Full error:", err.response);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="role"
            value={role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
          <p>Already have an account?</p>
          <button style={styles.button} onClick={() => navigate("/login")}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Register;
