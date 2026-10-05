import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import PlanResult from "./PlanResult";
import { toast } from "react-toastify";
import {
  Sparkles,
  Send,
  RotateCcw,
  Heart,
  Cake,
  Briefcase,
  GraduationCap,
  PartyPopper,
  Star,
  Home,
  MoreHorizontal,
  ChevronRight,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Steps config (preserving all original API fields)                     */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    key: "eventType",
    title: "What are you planning?",
    subtitle: "Choose the type of event you want to create",
    type: "cards",
    options: [
      { value: "Wedding", icon: Heart, desc: "Celebrate love & togetherness", color: "text-rose-600 bg-rose-50 border-rose-200" },
      { value: "Birthday", icon: Cake, desc: "Make the day unforgettable", color: "text-amber-600 bg-amber-50 border-amber-200" },
      { value: "Corporate", icon: Briefcase, desc: "Professional & polished", color: "text-blue-600 bg-blue-50 border-blue-200" },
      { value: "Graduation", icon: GraduationCap, desc: "Celebrate achievements", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
      { value: "Party", icon: PartyPopper, desc: "Fun for everyone", color: "text-purple-600 bg-purple-50 border-purple-200" },
      { value: "Anniversary", icon: Star, desc: "Honor milestones together", color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
      { value: "Housewarming", icon: Home, desc: "Welcome guests to your home", color: "text-teal-600 bg-teal-50 border-teal-200" },
      { value: "Other", icon: MoreHorizontal, desc: "Any other event type", color: "text-zinc-600 bg-zinc-50 border-zinc-200" },
    ],
  },
  {
    key: "details",
    title: "Event details",
    subtitle: "Tell us more about your event",
    type: "form",
    fields: [
      { key: "guests", label: "Number of guests", type: "number", placeholder: "e.g. 50", min: 1 },
      { key: "date", label: "Event date", type: "date" },
      { key: "venue", label: "Preferred city / venue", type: "text", placeholder: "e.g. Mumbai, Delhi, Surat..." },
    ],
    suggestions: {
      venue: ["Mumbai", "Delhi", "Surat", "Ahmedabad", "Jaipur", "Raipur", "Noida", "Manali"],
    },
  },
  {
    key: "budget",
    title: "What's your budget?",
    subtitle: "Select a range or enter a custom amount",
    type: "budget",
    presets: [
      { label: "₹60,000", value: 60000 },
      { label: "₹1,00,000", value: 100000 },
      { label: "₹2,00,000", value: 200000 },
      { label: "₹3,00,000", value: 300000 },
      { label: "₹6,00,000", value: 600000 },
    ],
  },
  {
    key: "preferences",
    title: "Food & theme preferences",
    subtitle: "Customize the look and feel of your event",
    type: "dual-cards",
    foodOptions: [
      { value: "Veg", label: "Vegetarian", emoji: "🥗" },
      { value: "Non-Veg", label: "Non-Vegetarian", emoji: "🍗" },
      { value: "Vegan", label: "Vegan", emoji: "🌱" },
      { value: "Mixed", label: "Mixed", emoji: "🍽️" },
    ],
    themeOptions: [
      { value: "Royal", label: "Royal", emoji: "👑" },
      { value: "Rustic", label: "Rustic", emoji: "🌾" },
      { value: "Modern", label: "Modern", emoji: "🏢" },
      { value: "Minimalist", label: "Minimalist", emoji: "🪞" },
      { value: "Luxury", label: "Luxury", emoji: "💎" },
      { value: "Fun", label: "Fun", emoji: "🎉" },
    ],
  },
];

const GENERATING_STEPS = [
  "Understanding your event",
  "Finding perfect venues",
  "Matching food preferences",
  "Selecting theme & decor",
  "Calculating budget breakdown",
  "Preparing your plan",
];

/* ------------------------------------------------------------------ */
/* Generating Screen                                                      */
/* ------------------------------------------------------------------ */
function GeneratingScreen({ answers }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < GENERATING_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-16">
      <motion.div
        className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-indigo-200"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={28} className="text-white" />
      </motion.div>

      <h2 className="text-2xl font-bold text-zinc-900 mb-2">
        Creating your event plan
      </h2>
      <p className="text-zinc-500 text-sm mb-10">
        AI is crafting the perfect plan for your{" "}
        <strong>{answers.eventType}</strong>
      </p>

      <div className="space-y-3 w-full max-w-sm">
        {GENERATING_STEPS.map((step, i) => (
          <motion.div
            key={step}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              i <= currentStep
                ? "bg-indigo-50 border border-indigo-100"
                : "bg-zinc-50 border border-zinc-100"
            }`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
              {i < currentStep ? (
                <CheckCircle2 size={18} className="text-indigo-600" />
              ) : i === currentStep ? (
                <Loader2 size={18} className="text-indigo-500 animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-zinc-200" />
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                i <= currentStep ? "text-indigo-700" : "text-zinc-400"
              }`}
            >
              {step}
            </span>
            {i < currentStep && (
              <span className="ml-auto text-xs text-indigo-400 font-medium">
                Done
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Event Type Cards                                              */
/* ------------------------------------------------------------------ */
function StepEventType({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STEPS[0].options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              onClick={() => {
                setSelected(opt.value);
                setTimeout(() => onSelect(opt.value), 180);
              }}
              className={`group flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? opt.color + " shadow-sm scale-[1.02]"
                  : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                  isSelected ? "bg-white/70" : "bg-zinc-100"
                }`}
              >
                <Icon size={18} className={isSelected ? opt.color.split(" ")[0] : "text-zinc-500"} />
              </div>
              <span className="font-semibold text-sm text-zinc-900">
                {opt.value}
              </span>
              <span className="text-xs text-zinc-400 mt-0.5 leading-snug">
                {opt.desc}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Event Details Form                                            */
/* ------------------------------------------------------------------ */
function StepDetails({ onSubmit }) {
  const [form, setForm] = useState({ guests: "", date: "", venue: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.guests || parseInt(form.guests) < 1)
      e.guests = "Please enter a valid guest count";
    if (!form.date) e.date = "Please select an event date";
    if (!form.venue.trim()) e.venue = "Please enter a city or venue";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          Number of guests
        </label>
        <input
          type="number"
          placeholder="e.g. 50"
          min="1"
          value={form.guests}
          onChange={(e) =>
            setForm({ ...form, guests: e.target.value }) ||
            setErrors({ ...errors, guests: undefined })
          }
          className="avy-input"
        />
        {errors.guests && (
          <p className="text-xs text-red-500 mt-1">{errors.guests}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          Event date
        </label>
        <input
          type="date"
          value={form.date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value }) ||
            setErrors({ ...errors, date: undefined })
          }
          className="avy-input"
        />
        {errors.date && (
          <p className="text-xs text-red-500 mt-1">{errors.date}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          Preferred city / venue
        </label>
        <input
          type="text"
          placeholder="e.g. Mumbai, Surat, Delhi..."
          value={form.venue}
          onChange={(e) =>
            setForm({ ...form, venue: e.target.value }) ||
            setErrors({ ...errors, venue: undefined })
          }
          className="avy-input"
        />
        {/* City suggestions */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["Mumbai", "Delhi", "Surat", "Ahmedabad", "Jaipur", "Raipur", "Noida"].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setForm({ ...form, venue: city })}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                form.venue === city
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
        {errors.venue && (
          <p className="text-xs text-red-500 mt-1">{errors.venue}</p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full py-3 mt-2">
        Continue <ChevronRight size={16} />
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Budget                                                         */
/* ------------------------------------------------------------------ */
function StepBudget({ onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const val = selected ?? parseInt(custom.replace(/,/g, ""));
    if (!val || val < 59000) {
      setError("Please select or enter a budget of at least ₹59,000");
      return;
    }
    onSubmit(val);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STEPS[2].presets.map((p) => (
          <motion.button
            key={p.value}
            onClick={() => {
              setSelected(p.value);
              setCustom("");
              setError("");
            }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selected === p.value
                ? "border-indigo-600 bg-indigo-50 shadow-sm"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <span
              className={`text-lg font-bold ${
                selected === p.value ? "text-indigo-700" : "text-zinc-900"
              }`}
            >
              {p.label}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">
          ₹
        </div>
        <input
          type="number"
          placeholder="Enter custom amount"
          value={custom}
          min="59000"
          onChange={(e) => {
            setCustom(e.target.value);
            setSelected(null);
            setError("");
          }}
          className="avy-input pl-7"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}

      <button onClick={handleSubmit} className="btn-primary w-full py-3">
        Continue <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4 — Preferences (Food + Theme)                                    */
/* ------------------------------------------------------------------ */
function StepPreferences({ onSubmit }) {
  const [food, setFood] = useState(null);
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!food) { setError("Please select a food preference"); return; }
    if (!theme) { setError("Please select a theme style"); return; }
    onSubmit({ food, theme });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-zinc-700 mb-3">Food preference</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STEPS[3].foodOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setFood(opt.value); setError(""); }}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                food === opt.value
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <span className="text-xl mb-1">{opt.emoji}</span>
              <span className={`text-xs font-semibold ${food === opt.value ? "text-indigo-700" : "text-zinc-700"}`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-zinc-700 mb-3">Theme style</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {STEPS[3].themeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setTheme(opt.value); setError(""); }}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                theme === opt.value
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <span className="text-xl mb-1">{opt.emoji}</span>
              <span className={`text-xs font-semibold ${theme === opt.value ? "text-indigo-700" : "text-zinc-700"}`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button onClick={handleSubmit} className="btn-primary w-full py-3">
        Generate My Plan <Sparkles size={15} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main ChatPlanner Component                                              */
/* ------------------------------------------------------------------ */
export default function ChatPlanner() {
  const { user } = useContext(UserContext);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState(null);

  const steps = [
    { label: "Event Type", key: "eventType" },
    { label: "Details", key: "details" },
    { label: "Budget", key: "budget" },
    { label: "Preferences", key: "preferences" },
  ];

  const handleStep0 = (eventType) => {
    setAnswers({ ...answers, eventType });
    setStepIdx(1);
  };

  const handleStep1 = ({ guests, date, venue }) => {
    setAnswers({ ...answers, guests, date, venue });
    setStepIdx(2);
  };

  const handleStep2 = (budget) => {
    setAnswers({ ...answers, budget });
    setStepIdx(3);
  };

  const handleStep3 = async ({ food, theme }) => {
    const finalAnswers = { ...answers, food, theme };
    setAnswers(finalAnswers);
    setGenerating(true);

    try {
      const payload = {
        eventType: finalAnswers.eventType,
        guests: Number(finalAnswers.guests),
        budget: Number(finalAnswers.budget),
        date: finalAnswers.date,
        venue: finalAnswers.venue,
        food: finalAnswers.food,
        theme: finalAnswers.theme,
      };
      const res = await axiosInstance.post(API_PATHS.AI.GENERATE_PLAN, payload);
      setPlan(res.data.plan);
    } catch (error) {
      let errorMsg = "Something went wrong. Please try again.";
      if (error.response?.status === 401) {
        errorMsg = "Please sign in to generate a plan.";
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (!error.response) {
        errorMsg = "Server unavailable. Please check your connection.";
      }
      toast.error(errorMsg);
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setAnswers({});
    setStepIdx(0);
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white sticky top-14 z-30">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-zinc-900 text-lg flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-600" />
                Plan Your Event
              </h1>
              {!plan && !generating && (
                <p className="text-xs text-zinc-400 mt-0.5">
                  Step {stepIdx + 1} of {steps.length}
                </p>
              )}
            </div>
            {(stepIdx > 0 || plan) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <RotateCcw size={13} />
                Start over
              </button>
            )}
          </div>

          {/* Progress bar */}
          {!plan && !generating && (
            <div className="mt-4">
              <div className="flex gap-1">
                {steps.map((s, i) => (
                  <div
                    key={s.key}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i <= stepIdx ? "bg-indigo-600" : "bg-zinc-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.key}
                    className={`text-[10px] font-medium ${
                      i <= stepIdx ? "text-indigo-600" : "text-zinc-300"
                    }`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {/* Plan result */}
          {plan ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PlanResult plan={plan} answers={answers} onReset={handleReset} />
            </motion.div>
          ) : generating ? (
            /* Generating state */
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GeneratingScreen answers={answers} />
            </motion.div>
          ) : (
            /* Steps */
            <motion.div
              key={stepIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Back button */}
              {stepIdx > 0 && (
                <button
                  onClick={() => setStepIdx(stepIdx - 1)}
                  className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-700 mb-6 transition-colors"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>
              )}

              <div className="mb-7">
                <h2 className="text-2xl font-bold text-zinc-900">
                  {STEPS[stepIdx].title}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {STEPS[stepIdx].subtitle}
                </p>
              </div>

              <div className="avy-card p-6">
                {stepIdx === 0 && <StepEventType onSelect={handleStep0} />}
                {stepIdx === 1 && <StepDetails onSubmit={handleStep1} />}
                {stepIdx === 2 && <StepBudget onSubmit={handleStep2} />}
                {stepIdx === 3 && <StepPreferences onSubmit={handleStep3} />}
              </div>

              {/* Summary of previous answers */}
              {Object.keys(answers).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {answers.eventType && (
                    <span className="avy-badge">
                      📅 {answers.eventType}
                    </span>
                  )}
                  {answers.guests && (
                    <span className="avy-badge">
                      👥 {answers.guests} guests
                    </span>
                  )}
                  {answers.venue && (
                    <span className="avy-badge">
                      📍 {answers.venue}
                    </span>
                  )}
                  {answers.budget && (
                    <span className="avy-badge">
                      ₹ {Number(answers.budget).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
