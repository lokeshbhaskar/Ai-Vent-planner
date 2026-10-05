import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// AuthPage simply redirects to login
export default function AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login-page", { replace: true });
  }, [navigate]);
  return null;
}