import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const PageTitle = () => {
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "AIVENT | AI Event Planner";
        break;
      case "/user-dashboard":
        document.title = "AIVENT | Dashboard";
        break;
      case "/login-page":
        document.title = "AIVENT | Login";
      case "/sign-up-page":
        document.title = "AIVENT | Register";
      case "/features-details":
        document.title = "AIVENT | Details Page";
      case "/ai-planner-page":
        document.title = "AIVENT | Planner Page";
      default:
        break;
    }
  },[location]);
  return  null;
};

export default PageTitle;
