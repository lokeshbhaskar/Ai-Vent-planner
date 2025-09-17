import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";  

const Layout = () => {
  const { currentTheme } = useTheme();  

  return (
    <div
      className={`flex flex-col min-h-screen ${currentTheme.bg} transition-colors duration-500 overflow-hidden`}
    >
      {/* Fixed Navbar */}
      <header className="z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className=" pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
