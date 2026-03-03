import { NavLink } from "react-router-dom";
import "../../../styles/recruiter/recruiterSidebar.css";

const RecruiterSidebar = () => {
  return (
    <aside className="recruiter-sidebar">
      <div className="recruiter-sidebar-header">
        <h2>Recruiter Panel</h2>
      </div>

      <nav className="recruiter-sidebar-nav">
        <NavLink
          to="/recruiter/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active-link" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/recruiter/jobs"
          className={({ isActive }) =>
            isActive ? "sidebar-link active-link" : "sidebar-link"
          }
        >
          Jobs
        </NavLink>

        <NavLink
          to="/recruiter/post-job"
          className={({ isActive }) =>
            isActive ? "sidebar-link active-link" : "sidebar-link"
          }
        >
          Post Job
        </NavLink>

        <NavLink
          to="/recruiter/company-profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link active-link" : "sidebar-link"
          }
        >
          Company Profile
        </NavLink>

        <NavLink
          to="/recruiter/settings"
          className={({ isActive }) =>
            isActive ? "sidebar-link active-link" : "sidebar-link"
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default RecruiterSidebar;
