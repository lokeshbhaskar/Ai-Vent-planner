import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16  ">
        {/* pt = space for fixed navbar, pb = space for fixed footer */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
