import { useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

export default function Signup() {
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, form);
      console.log(res.data);
      updateUser(res.data);
      setMessage(res.data.message);
      navigate("/");
      toast.success("Account created successfully! Welcome aboard.", {
        style: {
          width: "300px",
          borderRadius: "12px",
          textAlign: "center",
          margin: "0 auto",
        },
      });
    } catch (err) {
      setMessage("Signup failed!");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center  bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold  text-center">Sign Up</h2>
        <p className="p-4 text-center">
          Have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login-page")}
          >
            Login
          </span>
        </p>
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <Button type="submit">Sign Up</Button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}
