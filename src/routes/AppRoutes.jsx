import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public Pages
import Home from "../pages/public/Home";

//Auth Pages
import CandidateLogin from "../pages/auth/candidate/CandidateLogin";
import CandidateRegister from "../pages/auth/candidate/CandidateRegister";
import RecruiterLogin from "../pages/auth/recruiter/RecruiterLogin";
import RecruiterRegister from "../pages/auth/recruiter/RecruiterRegister";

// Candidate Pages
import CandidateDashboard from "../pages/candidate/CandidateDashboard";

// Recruiter Pages
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/login/candidate" element={<CandidateLogin />} />
      <Route path="/register/candidate" element={<CandidateRegister />} />

      <Route path="/login/recruiter" element={<RecruiterLogin />} />
      <Route path="/register/recruiter" element={<RecruiterRegister />} />

      {/* Candidate Routes */}
      <Route
        path="/candidate/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["candidate"]}>
              <CandidateDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Recruiter Routes */}
      <Route
        path="/recruiter/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
