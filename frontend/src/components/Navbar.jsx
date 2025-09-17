import React, { useContext, useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import {
  User,
  LogOut,
  HomeIcon,
  Calendar1Icon,
  LayoutDashboardIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import OnlineStatus from "./OutlineStatus";

const Navbar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearUser();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
    toast.info("👋 You have been logged out.", {
      style: {
        width: "300px",
        borderRadius: "12px",
        textAlign: "center",
        margin: "0 auto",
      },
    });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features-details" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.nav
      className="flex items-center justify-between px-4 md:px-8 py-4 bg-white/40 backdrop-blur-md shadow-lg border-b border-white/30 sticky top-0 z-50"
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Brand */}
      <h1 className="flex items-center text-3xl font-extrabold text-gray-800 space-x-1 cursor-pointer" onClick={()=> navigate('/')}>
        <Calendar1Icon size={25} className="text-pink-300" />
        <span className="text-purple-700">AI</span>
        <span className="text-sky-500">vent</span>
      </h1>
       <OnlineStatus/>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`hover:text-purple-600 transition ${
              location.pathname === link.path ? "text-purple-700 font-bold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
       
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XIcon className="text-red-800" size={30} />
            ) : (
              <MenuIcon className="text-purple-800" size={30} />
            )}
          </button>
        </div>
      

        {user ? (
          <div className="hidden md:block relative" ref={dropdownRef}>
            {/* User Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition cursor-pointer"
              aria-label="User menu"
            >
              <span>Welcome, {user.name}</span>
              <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
                {user.name[0].toUpperCase()}
              </div>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-44 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition text-red-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/user-dashboard")}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition text-purple-700"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LayoutDashboardIcon className="w-4 h-4" /> Dashboard
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition text-teal-700"
                    whileHover={{ scale: 1.05 }}
                  >
                    <HomeIcon className="w-4 h-4" /> Home
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Button
            className="hidden md:block bg-gradient-to-r from-purple-600 to-pink-500 hover:bg-purple-700 text-white rounded-full   font-bold text-lg"
            onClick={() => navigate("/auth-page")}
            size="lg"
          >
            Join Now
          </Button>
        )}
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bg-pink-200/40 backdrop-blur-xl top-18 right-0 w-3/4 h-auto shadow-lg z-40 flex flex-col p-6 gap-4 md:hidden"
          >
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block w-full px-4 py-2 rounded-lg text-lg font-medium transition ${
                  location.pathname === link.path
                    ? "bg-purple-100 text-purple-700 font-bold"
                    : "text-teal-900 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Divider */}
            <hr className="my-3 border-purple-200" />

            {/* Auth Buttons */}
            {user ? (
              <div className="flex flex-col gap-3">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2"
                  onClick={() => {
                    navigate("/user-dashboard");
                    setMobileOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-lg py-2"
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white rounded-lg py-2"
                onClick={() => {
                  navigate("/auth-page");
                  setMobileOpen(false);
                }}
              >
                Join Now
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
    </motion.nav>
  );
};

export default Navbar;
