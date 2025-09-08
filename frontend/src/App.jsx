import LandinPage from "./pages/LandinPage";
import { Route, Router, Routes } from "react-router-dom";
import ChatPlanner from "./pages/chat-planner/ChatPlanner";
import AuthPage from "./pages/auth/AuthPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./components/Layout";
import UserDashboard from "./components/UserDashboard";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        transition={Slide}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandinPage />} />
          <Route path="/ai-planner-page" element={<ChatPlanner />} />
          {/* auth page */}
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/login-page" element={<Login />} />
          <Route path="/sign-up-page" element={<Signup />} />
          {/* user dashboard */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
