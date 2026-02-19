import { NavLink } from "react-router-dom";
import "./LeftSidebar.css";

const LeftSidebar = () => {
  return (
    <div className="candidate-sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/candidate/profile" className="sidebar-item">
          <span>👤</span>
          <small>Profile</small>
        </NavLink>

        <NavLink to="/candidate/dashboard" className="sidebar-item">
          <span>💼</span>
          <small>Jobs</small>
        </NavLink>

        <NavLink to="/candidate/applied" className="sidebar-item">
          <span>📄</span>
          <small>Applied</small>
        </NavLink>

        <NavLink to="/candidate/saved" className="sidebar-item">
          <span>⭐</span>
          <small>Saved</small>
        </NavLink>

        <NavLink to="#" className="sidebar-item">
          <span>💬</span>
          <small>Messages</small>
        </NavLink>

        <NavLink to="#" className="sidebar-item">
          <span>🎁</span>
          <small>Refer</small>
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftSidebar;
