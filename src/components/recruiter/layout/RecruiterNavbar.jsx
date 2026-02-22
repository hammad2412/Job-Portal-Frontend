import { useAuth } from "../../../hooks/useAuth";

const RecruiterNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="recruiter-navbar">
      <div className="navbar-left">
        <h2>Recruiter Panel</h2>
      </div>

      <div className="navbar-right">
        <span className="recruiter-name">{user?.name || "Recruiter"}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default RecruiterNavbar;
