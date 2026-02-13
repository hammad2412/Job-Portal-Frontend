import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

const CandidateDashboard = () => {
  const { logout, user } = useAuth();
  const [profile, setProfile] = useState({
    headline: "",
    summary: "",
    experienceYears: 0,
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 🔥 Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/candidate-profile/me");

        const data = res.data.profile; // 🔥 THIS IS THE FIX

        if (data) {
          setProfile({
            headline: data.headline || "",
            summary: data.summary || "",
            experienceYears: data.experienceYears || 0,
            skills: data.skills?.join(", ") || "",
          });
        }
      } catch (err) {
        console.error(err);
        console.log("Profile not found (new user)");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/candidate-profile", {
        headline: profile.headline,
        summary: profile.summary,
        experienceYears: Number(profile.experienceYears),
        skills: profile.skills.split(",").map((s) => s.trim()),
      });

      setMessage("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong ❌");
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <>
      <div style={styles.header}>
        <h2>Candidate Dashboard</h2>
        <h3>Welcome {user.name}</h3>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Candidate Profile</h2>

          {message && <p>{message}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="headline"
              placeholder="Professional Headline"
              value={profile.headline}
              onChange={handleChange}
              style={styles.input}
            />

            <textarea
              name="summary"
              placeholder="Professional Summary"
              value={profile.summary}
              onChange={handleChange}
              style={styles.textarea}
            />

            <input
              type="number"
              name="experienceYears"
              placeholder="Years of Experience"
              value={profile.experienceYears}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={profile.skills}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logoutBtn: {
    padding: "8px 15px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
  },
  card: {
    width: "600px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    height: "100px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default CandidateDashboard;
