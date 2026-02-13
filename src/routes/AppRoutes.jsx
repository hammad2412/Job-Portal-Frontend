import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
