import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

export default function Signup() {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, form);
      updateUser(res.data);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const pwdStrength =
    form.password.length === 0
      ? null
      : form.password.length < 6
      ? "weak"
      : form.password.length < 10
      ? "medium"
      : "strong";

  const perks = [
    "Free to start, no credit card required",
    "AI-generated plans in seconds",
    "Save unlimited event plans",
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-violet-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="font-bold text-xl text-zinc-900">
            AI<span className="text-indigo-600">vent</span>
          </span>
        </div>

        <div className="avy-card p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 mb-1">
              Create your account
            </h1>
            <p className="text-sm text-zinc-500">
              Start planning events powered by AI
            </p>
          </div>

          {/* Perks */}
          <div className="mb-5 space-y-2">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check size={10} className="text-emerald-600" />
                </div>
                <span className="text-xs text-zinc-500">{perk}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-100 pt-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="avy-input"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="avy-input"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    name="password"
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    className="avy-input pr-10"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    tabIndex={-1}
                  >
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {/* Password strength */}
                {pwdStrength && (
                  <div className="flex gap-1 mt-2">
                    {["weak", "medium", "strong"].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          pwdStrength === "weak"
                            ? level === "weak"
                              ? "bg-red-400"
                              : "bg-zinc-100"
                            : pwdStrength === "medium"
                            ? level !== "strong"
                              ? "bg-amber-400"
                              : "bg-zinc-100"
                            : "bg-emerald-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    Create account
                    <ArrowRight size={15} />
                  </span>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                to="/login-page"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-6">
          By creating an account you agree to our Terms & Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
