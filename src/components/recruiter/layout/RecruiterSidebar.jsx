import { NavLink } from "react-router-dom";

const RecruiterSidebar = () => {
  return (
    <aside className="recruiter-sidebar">
      <nav>
        <NavLink to="/recruiter/dashboard">Dashboard</NavLink>
        <NavLink to="/recruiter/jobs">Jobs</NavLink>
        <NavLink to="/recruiter/post-job">Post Job</NavLink>
        <NavLink to="/recruiter/company-profile">Company Profile</NavLink>
        <NavLink to="/recruiter/settings">Settings</NavLink>
      </nav>
    </aside>
  );
};

export default RecruiterSidebar;
