import { useState, useEffect } from "react";
import api, { setAccessToken } from "../api/axios";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setLocalAccessToken] = useState(null);
  const navigate = useNavigate();

  // 🔥 Restore session on app load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshUser = async () => {
      try {
        const res = await api.post("/auth/refresh");

        setAccessToken(res.data.accessToken);
        setLocalAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    refreshUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { user, accessToken } = response.data;

    setAccessToken(accessToken);
    setLocalAccessToken(accessToken);
    setUser(user);

    return user;
  };

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
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
