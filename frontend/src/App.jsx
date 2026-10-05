import LandinPage from "./pages/LandinPage";
import { Route, Routes } from "react-router-dom";
import ChatPlanner from "./pages/chat-planner/ChatPlanner";
import AuthPage from "./pages/auth/AuthPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./components/Layout";
import UserDashboard from "./components/UserDashboard";
import FeatureDetails from "./components/FeatureDetails";
import { Slide, ToastContainer } from "react-toastify";
import PageTitle from "./components/PageTitle";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Slide}
        toastClassName="font-sans"
        closeButton={false}
        hideProgressBar
      />
      <PageTitle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandinPage />} />
          <Route path="/ai-planner-page" element={<ChatPlanner />} />
          {/* Auth pages — no navbar needed so we render standalone */}
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/login-page" element={<Login />} />
          <Route path="/sign-up-page" element={<Signup />} />
          {/* Dashboard & features */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/features-details" element={<FeatureDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
