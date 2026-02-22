import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public Pages
import Home from "../pages/public/Home";

//Auth Pages
import AuthCandidate from "../pages/auth/candidate/AuthCandidate";
import AuthRecruiter from "../pages/auth/recruiter/AuthRecruiter";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";

// Candidate Pages
import CandidateDashboard from "../pages/candidate/CandidateDashboard";
import CandidateLayout from "../components/candidateDashboard/layout/CandidateLayout";
import AppliedJobs from "../pages/candidate/AppliedJobs";
import SavedJobs from "../pages/candidate/SavedJobs";
import CandidateProfile from "../pages/candidate/CandidateProfile";

// Recruiter Pages
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import RecruiterLayout from "../components/recruiter/layout/RecruiterLayout";
import JobsPage from "../pages/recruiter/JobsPage";
import JobDetailsPage from "../pages/recruiter/JobDetailsPage";
import PostJobPage from "../pages/recruiter/PostJobPage";
import CompanyProfilePage from "../pages/recruiter/CompanyProfilePage";
import SettingsPage from "../pages/recruiter/SettingsPage";
import EditJobPage from "../pages/recruiter/EditJobPage";

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

      {/* ================= RECRUITER ROUTES ================= */}
      <Route
        path="/recruiter"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["recruiter"]}>
              <RecruiterLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="jobs/:jobId/edit" element={<EditJobPage />} />
        <Route path="post-job" element={<PostJobPage />} />
        <Route path="company-profile" element={<CompanyProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

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
