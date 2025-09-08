import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import EventThemes from "../components/EventThemes";
import AIDemo from "../components/AiDemo";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";

const LandinPage = () => {
  return (
    <div className="min-h-screen flex flex-col p-0">
      {/* <Navbar /> */}
      <Hero />
      <HowItWorks />
      <EventThemes />
      <AIDemo/>
      <Testimonials/>
      <Pricing/>
      <Features />
      <Footer />
    </div>
  );
};

export default LandinPage;
