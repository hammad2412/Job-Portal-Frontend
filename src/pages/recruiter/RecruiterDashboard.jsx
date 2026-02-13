import { useAuth } from "../../hooks/useAuth";

const RecruiterDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Recruiter Dashboard</h1>
      <p>Welcome {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default RecruiterDashboard;
