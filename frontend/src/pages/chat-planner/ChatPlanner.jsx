import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Button } from "../../components/ui/button";
import { Save } from "lucide-react";
import { UserContext } from "../../context/userContext";
import PlanResult from "./PlanResult";
import { toast } from "react-toastify";

const STEPS = [
  {
    key: "eventType",
    question: "🎉 What type of event is this?",
    suggestions: ["Wedding", "Birthday", "Corporate"],
  },
  {
    key: "guests",
    question: "👥 How many guests are you expecting?",
    suggestions: ["50", "100", "200"],
    validator: (v) => /^\d+$/.test(v) && Number(v) > 0,
    error: "Please enter a valid number of guests.",
  },
  {
    key: "budget",
    question: "💰 What’s your total budget (in INR)?",
    suggestions: ["100000", "200000", "300000"],
    validator: (v) => /^\d+$/.test(v) && Number(v) >= 10000,
    error: "Please enter a valid number (>= 10000).",
  },
  {
    key: "date",
    question: "📅 What’s the event date? (YYYY-MM-DD)",
    validator: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v),
    error: "Enter date as YYYY-MM-DD.",
  },
  {
    key: "venue",
    question: "📍 Preferred city/venue?",
    suggestions: [
      "Surat",
      "Raipur",
      "Ahmedabad",
      "Mumbai",
      "Jaipur",
      "Delhi",
      "Patna",
      "Manali",
      "Noida",
    ],
  },
  {
    key: "food",
    question: "🍽️ Preferred food?",
    suggestions: ["Veg", "Non-Veg", "Vegan", "Mix"],
  },
  {
    key: "theme",
    question: "🎨 Pick a theme style",
    suggestions: ["Royal", "Rustic", "Minimalist", "Modern"],
  },
];

export default function ChatPlanner() {
  const [stepIdx, setStepIdx] = useState(0);
  const [messages, setMessages] = useState([
    { from: "bot", text: STEPS[0].question },
  ]);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, plan]);

  const currentStep = STEPS[stepIdx];

  const sendAnswer = async (value) => {
    if (!currentStep) return;

    if (currentStep.validator && !currentStep.validator(value)) {
      setMessages((m) => [
        ...m,
        { from: "user", text: value },
        { from: "bot", text: currentStep.error },
      ]);
      return;
    }

    const newAnswers = { ...answers, [currentStep.key]: value };
    setAnswers(newAnswers);
    setMessages((m) => [...m, { from: "user", text: value }]);

    if (stepIdx < STEPS.length - 1) {
      setStepIdx(stepIdx + 1);
      setMessages((m) => [
        ...m,
        { from: "bot", text: STEPS[stepIdx + 1].question },
      ]);
    } else {
      setLoading(true);
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⏳ Got it! Generating your plan..." },
      ]);
      try {
        const payload = {
          eventType: newAnswers.eventType,
          guests: Number(newAnswers.guests),
          budget: Number(newAnswers.budget),
          date: newAnswers.date,
          venue: newAnswers.venue,
          food: newAnswers.food,
          theme: newAnswers.theme,
        };
        const res = await axiosInstance.post(
          API_PATHS.AI.GENERATE_PLAN,
          payload
        );
        setPlan(res.data.plan);
        setMessages((m) => [
          ...m,
          { from: "bot", text: "✨ Here’s your event plan!" },
        ]);
      } catch (err) {
        let errorMsg = "Something went wrong. Please try again.";
        toast.error(errorMsg, {
          style: {
            width: "280px",
            borderRadius: "12px",
            textAlign: "center",
            margin: "0 auto",
          },
        });
        if (err.response) {
          if (err.response.status === 401) {
            errorMsg = "Unauthorized. Please login first.";
          } else if (err.response.status === 403) {
            errorMsg = "Access denied. You don’t have permission.";
          } else if (err.response.data?.message) {
            errorMsg = err.response.data.message;
          }
        } else if (err.request) {
          errorMsg = "No response from server. Check your connection.";
        } else {
          errorMsg = err.message;
        }
        setMessages((m) => [...m, { from: "bot", text: errorMsg }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter" && input.trim() && !loading) {
      sendAnswer(input.trim());
      setInput("");
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-screen border border-gray-200 mt-2">
      {/* Chat Window */}
      <div ref={listRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] shadow ${
                  m.from === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Suggestion Chips */}
        {!plan && currentStep?.suggestions?.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentStep.suggestions.map((s) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={s}
                onClick={() => sendAnswer(s)}
                disabled={loading}
                className="px-4 py-1 text-sm rounded-full border border-gray-300 bg-white hover:bg-indigo-50 hover:border-indigo-400 transition shadow-sm"
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Plan Result */}
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4"
          >
            <PlanResult plan={plan} />
          </motion.div>
        )}
      </div>

      {/* Input */}
      {!plan && (
        <div className="p-3 border-t bg-white flex gap-2">
          <input
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Type your answer…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onEnter}
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (input.trim() && !loading) {
                sendAnswer(input.trim());
                setInput("");
              }
            }}
            disabled={loading}
            className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {loading ? "..." : "Send"}
          </motion.button>
        </div>
      )}
    </div>
  );
}
