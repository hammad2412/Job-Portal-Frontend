import { useAuth } from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
