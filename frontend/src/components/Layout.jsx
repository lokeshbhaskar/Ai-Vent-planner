import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // <-- import hook

const Layout = () => {
  const { currentTheme } = useTheme(); // <-- get current theme

  return (
    <div
      className={`flex flex-col min-h-screen ${currentTheme.bg} transition-colors duration-500`}
    >
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
