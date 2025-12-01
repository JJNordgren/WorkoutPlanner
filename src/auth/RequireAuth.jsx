import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequireAuth({ children }) {
  const { user, authLoading } = useAuth();
  const loc = useLocation();

  if (authLoading) {
    return <p style={{ textAlign: "center" }}>Loading…</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }

  return children;
}

export default RequireAuth;
