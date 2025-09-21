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
      <header className="z-50">
        <Navbar />
      </header>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
