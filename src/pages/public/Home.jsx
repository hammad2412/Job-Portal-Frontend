// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  // const { user } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     if (user.role === "candidate") {
  //       navigate("/candidate/dashboard");
  //     } else {
  //       navigate("/recruiter/dashboard");
  //     }
  //   }
  // }, [user]);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to JobPortal</h1>
        <p style={styles.subtitle}>
          Find your dream job or hire the best talent.
        </p>

        <div style={styles.buttonGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
    color: "white",
    textAlign: "center",
  },
  hero: {
    maxWidth: "500px",
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    opacity: 0.9,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  primaryBtn: {
    padding: "12px 25px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "white",
    color: "#4f46e5",
    fontWeight: "bold",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "12px 25px",
    borderRadius: "6px",
    border: "2px solid white",
    backgroundColor: "transparent",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Home;
