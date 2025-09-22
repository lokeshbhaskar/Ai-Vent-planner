import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Login() {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, form);
      updateUser(res.data);
      setMessage("Login successful!");
      toast.success("Login Success!", {
        style: {
          width: "300px",
          borderRadius: "12px",
          textAlign: "center",
          margin: "0 auto",
        },
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setMessage("Login failed!");
      toast.error("Login error");
      console.error(err);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🎨 Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundSize: "200% 200%" }}
      ></motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 w-[380px]
                   hover:shadow-purple-400/30 transition-all duration-500"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-4 text-white drop-shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          ✨ Welcome Back
        </motion.h2>
        <p className="text-center text-gray-200 mb-6">
          New user?{" "}
          <span
            className="text-yellow-300 cursor-pointer hover:underline font-semibold"
            onClick={() => navigate("/sign-up-page")}
          >
            Sign up
          </span>
        </p>

        {/* Inputs with glow effect */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/70 focus:ring-4 focus:ring-purple-400 focus:outline-none border-none placeholder-gray-600"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/70 focus:ring-4 focus:ring-purple-400 focus:outline-none border-none placeholder-gray-600"
            required
          />
        </motion.div>

        {/* Button with glow + animation */}
        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-pink-300/50 transition-all duration-300"
          >
            🚀 Login
          </Button>
        </motion.div>

        {/* Feedback Message */}
        {message && (
          <motion.p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("successful") ? "text-green-300" : "text-red-300"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
}
