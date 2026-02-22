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
    return <div>Loading...</div>;
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
          <Outlet />
        </main>
      </div>

      <RecruiterFooter />
    </div>
  );
};

export default RecruiterLayout;
