import { Routes, Route, Navigate } from "react-router-dom";
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
import CandidateLayout from "../components/candidateDashboard/layout/CandidateLayout";
import AppliedJobs from "../pages/candidate/AppliedJobs";
import SavedJobs from "../pages/candidate/SavedJobs";
import CandidateProfile from "../pages/candidate/CandidateProfile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/auth/candidate" element={<AuthCandidate />} />
      <Route path="/auth/recruiter" element={<AuthRecruiter />} />

      {/* ================= CANDIDATE ROUTES ================= */}
      <Route
        path="/candidate"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["candidate"]}>
              <CandidateLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="applied" element={<AppliedJobs />} />
        <Route path="saved" element={<SavedJobs />} />
        <Route path="profile" element={<CandidateProfile />} />
      </Route>

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
