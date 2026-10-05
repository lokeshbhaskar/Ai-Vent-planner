import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Calendar,
  Users,
  IndianRupee,
  Brain,
  CheckCircle2,
  Star,
  ChevronRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { UserContext } from "../context/userContext";

/* ------------------------------------------------------------------ */
/* Animation variants                                                    */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/* Dashboard preview (static UI mock)                                    */
/* ------------------------------------------------------------------ */
const heroImages = ["/img_1.jpg", "/img_2.jpg", "/img_3.jpg"];

function HeroImageStack() {
  return (
    <div className="relative w-[340px] h-[380px] flex items-center justify-center">
      {heroImages.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`event-${index + 1}`}
          className="absolute w-[220px] h-[290px] object-cover rounded-2xl shadow-2xl"
          initial={{
            rotate: index === 0 ? -15 : index === 1 ? 0 : 15,
            x: index === 0 ? -90 : index === 1 ? 0 : 90,
            zIndex: index,
          }}
          whileHover={{ scale: 1.06, zIndex: 10, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                   */
/* ------------------------------------------------------------------ */
function Hero() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #18181b 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
                <Sparkles size={12} />
                AI-Powered Event Planning
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 leading-[1.05] tracking-tight mb-6"
            >
              Plan your perfect
              <br />
              <span className="gradient-text">event with AI.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-zinc-500 max-w-xl mb-8 leading-relaxed"
            >
              Create budgets, timelines, guest lists and complete event plans in
              minutes — powered by AI.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <button
                className="btn-primary text-base px-6 py-3 rounded-xl gap-2"
                onClick={() =>
                  navigate(user ? "/ai-planner-page" : "/sign-up-page")
                }
              >
                Create Your Event
                <ArrowRight size={16} />
              </button>
              <button
                className="btn-secondary text-base px-6 py-3 rounded-xl"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See How It Works
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 flex items-center gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: <Shield size={14} />, text: "Free to start" },
                { icon: <Zap size={14} />, text: "AI-generated in seconds" },
                { icon: <Clock size={14} />, text: "Save hours of planning" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 text-xs text-zinc-500"
                >
                  <span className="text-indigo-500">{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Fanned event image stack */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <HeroImageStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How It Works                                                           */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Tell us about your event",
      desc: "Share event type, date, number of guests, budget preferences, and your city.",
    },
    {
      num: "02",
      title: "AI creates your personalized plan",
      desc: "Our AI analyzes real venue, catering, and vendor options to craft the perfect plan.",
    },
    {
      num: "03",
      title: "Manage everything in one place",
      desc: "Save your plan, track your budget, manage guests, and coordinate vendors effortlessly.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">How It Works</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-zinc-900">
            Plan any event in 3 simple steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-zinc-200 z-0">
                  <ChevronRight
                    size={16}
                    className="absolute -right-2 -top-2 text-zinc-300"
                  />
                </div>
              )}
              <div className="relative z-10 avy-card p-8 hover:shadow-lg transition-shadow">
                <span className="text-4xl font-extrabold text-zinc-100 select-none">
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold text-zinc-900 mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                               */
/* ------------------------------------------------------------------ */
function Features() {
  const features = [
    {
      icon: <Brain size={20} />,
      title: "AI Event Planning",
      desc: "Describe your event and let AI generate a complete, personalized plan instantly.",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: <IndianRupee size={20} />,
      title: "Smart Budget Planning",
      desc: "AI allocates your budget across venue, food, decor and entertainment optimally.",
      color: "text-violet-600 bg-violet-50",
    },
    {
      icon: <Calendar size={20} />,
      title: "Event Timeline",
      desc: "Auto-generated countdown timelines with milestones and task reminders.",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: <Users size={20} />,
      title: "Guest Management",
      desc: "Track RSVPs, meal preferences, contact details and send invitations.",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: <Star size={20} />,
      title: "Vendor Recommendations",
      desc: "Get curated vendor suggestions for venues, caterers, photographers and more.",
      color: "text-amber-600 bg-amber-50",
    },
    {
      icon: <Sparkles size={20} />,
      title: "AI Event Assistant",
      desc: "Chat with your AI assistant to adjust budget, timeline or preferences anytime.",
      color: "text-pink-600 bg-pink-50",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Features</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-zinc-900">
            Everything you need to plan a perfect event
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            From initial planning to day-of execution, AIvent covers every detail.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i}
              className="avy-card p-6 group cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social Proof                                                           */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const testimonials = [
    {
      quote:
        "Planned my entire wedding in under an hour. The AI nailed the budget breakdown perfectly for our city.",
      name: "Priya Sharma",
      role: "Bride, Ahmedabad",
      initials: "PS",
    },
    {
      quote:
        "Saved us 40+ hours of back-and-forth with vendors. The event timeline feature is exceptional.",
      name: "Rahul Verma",
      role: "Corporate Event Manager, Mumbai",
      initials: "RV",
    },
    {
      quote:
        "I've planned 5 events using AIvent. The vendor recommendations alone are worth every rupee.",
      name: "Anjali Mehta",
      role: "Birthday Party Host, Delhi",
      initials: "AM",
    },
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="mt-3 text-3xl font-bold text-zinc-900">
            Trusted by event planners across India
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="avy-card p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                              */
/* ------------------------------------------------------------------ */
function FinalCTA() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
            Ready to plan your
            <br />
            <span className="gradient-text">next event?</span>
          </h2>
          <p className="text-zinc-500 mb-8 text-lg">
            Join thousands of event planners who use AIvent to create memorable
            experiences.
          </p>
          <button
            className="btn-primary text-base px-8 py-3.5 rounded-xl gap-2"
            onClick={() =>
              navigate(user ? "/ai-planner-page" : "/sign-up-page")
            }
          >
            Create My Event
            <ArrowRight size={16} />
          </button>
          <p className="text-xs text-zinc-400 mt-4">
            Free to start · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                                 */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-white font-bold text-base">
                AI<span className="text-indigo-400">vent</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs">
              AI-powered event planning for weddings, birthdays, corporate events
              and more.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-3">
                Product
              </p>
              <div className="space-y-2 text-sm">
                <a href="/" className="block hover:text-white transition-colors">Home</a>
                <a href="#features" className="block hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="block hover:text-white transition-colors">How It Works</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-3">
                Account
              </p>
              <div className="space-y-2 text-sm">
                <a href="/sign-up-page" className="block hover:text-white transition-colors">Sign up</a>
                <a href="/login-page" className="block hover:text-white transition-colors">Login</a>
                <a href="/user-dashboard" className="block hover:text-white transition-colors">Dashboard</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} AIvent. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ♥ for event planners</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Landing Page (assembled)                                               */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
