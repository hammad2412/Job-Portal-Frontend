import { useState, useEffect } from "react";
import api, { setAccessToken } from "../api/axios";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setLocalAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* =========================================
     Restore session on app load (IMPORTANT)
  ========================================= */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1️⃣ Get new access token using refresh token cookie
        const refreshRes = await api.post("/auth/refresh");

        const newAccessToken = refreshRes.data.accessToken;

        setAccessToken(newAccessToken);
        setLocalAccessToken(newAccessToken);

        // 2️⃣ Now fetch real user from backend
        const meRes = await api.get("/auth/me");

        setUser(meRes.data.data);
      } catch (err) {
        console.log("No active session");
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /* =========================================
     LOGIN
  ========================================= */
  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { accessToken } = response.data;

    setAccessToken(accessToken);
    setLocalAccessToken(accessToken);

    // 🔥 Immediately fetch real user from backend
    const meRes = await api.get("/auth/me");

    setUser(meRes.data.data);

    console.log("Fresh User After Login:", meRes.data.data);

    return meRes.data.data;
  };

  /* =========================================
     LOGOUT
  ========================================= */
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
    }

    setAccessToken(null);
    setLocalAccessToken(null);
    setUser(null);

    navigate("/");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
