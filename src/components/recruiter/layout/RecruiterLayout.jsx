import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import RecruiterNavbar from "./RecruiterNavbar";
import RecruiterSidebar from "./RecruiterSidebar";
import RecruiterFooter from "./RecruiterFooter";
import "../../../styles/recruiter/recruiterLayout.css";

const RecruiterLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isCompanyPage = location.pathname.includes("company-profile");

  if (loading) {
    return (
      <div className="recruiter-loading-screen">
        <div className="recruiter-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user?.companyId && !isCompanyPage) {
    return <Navigate to="/recruiter/company-profile" replace />;
  }

  return (
    <div className="recruiter-layout">
      <RecruiterNavbar />

      <div className="recruiter-body">
        <RecruiterSidebar />

        <main className="recruiter-main">
          <div className="recruiter-content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>

      <RecruiterFooter />
    </div>
  );
};

export default RecruiterLayout;
