import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public Pages
import Home from "../pages/public/Home";

//Auth Pages
import AuthCandidate from "../pages/auth/candidate/AuthCandidate";
import AuthRecruiter from "../pages/auth/recruiter/AuthRecruiter";

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
      <Route path="/auth/candidate" element={<AuthCandidate />} />

      <Route path="/auth/recruiter" element={<AuthRecruiter />} />

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
