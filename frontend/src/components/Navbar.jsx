import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import {
  Calendar,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  Sparkles,
  Home,
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
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearUser();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
    toast.info("You've been signed out.");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features-details" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
            : "bg-white/80 backdrop-blur-sm border-b border-zinc-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Brand */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-bold text-lg tracking-tight text-zinc-900 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            AI<span className="text-indigo-600">vent</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <OnlineStatus />

            {user ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                  aria-label="User menu"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-zinc-700">{user.name}</span>
                  <ChevronDown
                    size={14}
                    className={`text-zinc-400 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-zinc-200 shadow-lg overflow-hidden z-50 py-1"
                    >
                      <div className="px-3 py-2 border-b border-zinc-100">
                        <p className="text-xs text-zinc-400 font-medium">Signed in as</p>
                        <p className="text-sm font-semibold text-zinc-800 truncate">{user.name}</p>
                      </div>
                      <button
                        onClick={() => { navigate("/user-dashboard"); setDropdownOpen(false); }}
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        <LayoutDashboard size={15} className="text-zinc-400" />
                        My Events
                      </button>
                      <button
                        onClick={() => { navigate("/"); setDropdownOpen(false); }}
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        <Home size={15} className="text-zinc-400" />
                        Home
                      </button>
                      <div className="border-t border-zinc-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={15} />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => navigate("/login-page")}
                  className="px-3 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/sign-up-page")}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Get started
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-14 inset-x-0 z-40 bg-white border-b border-zinc-200 shadow-lg md:hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-zinc-100 mt-3 space-y-2">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate("/user-dashboard")}
                      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
                    >
                      <LayoutDashboard size={16} className="text-zinc-400" />
                      My Events
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login-page")}
                      className="w-full py-2.5 text-center text-sm font-medium text-zinc-700 border border-zinc-200 rounded-lg hover:bg-zinc-50"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => navigate("/sign-up-page")}
                      className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Get started free
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-14" />
    </>
  );
};

export default Navbar;
