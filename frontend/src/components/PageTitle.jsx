import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "AIvent — AI-Powered Event Planning",
  "/user-dashboard": "My Events — AIvent",
  "/login-page": "Sign In — AIvent",
  "/sign-up-page": "Create Account — AIvent",
  "/features-details": "Features — AIvent",
  "/ai-planner-page": "Plan Your Event — AIvent",
  "/auth-page": "Sign In — AIvent",
};

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "AIvent — AI Event Planner";
  }, [location]);

  return null;
};

export default PageTitle;
