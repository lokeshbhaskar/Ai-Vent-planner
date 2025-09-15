// import { useContext, useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axiosInstance from "@/utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import { Button } from "../../components/ui/button";
// import { Save } from "lucide-react";
// import { UserContext } from "../../context/userContext";
// import PlanResult from "./PlanResult";
// import { toast } from "react-toastify";

// const STEPS = [
//   {
//     key: "eventType",
//     question: "🎉 What type of event is this?",
//     suggestions: ["Wedding", "Birthday", "Corporate"],
//   },
//   {
//     key: "guests",
//     question: "👥 How many guests are you expecting?",
//     suggestions: ["50", "100", "200"],
//     validator: (v) => /^\d+$/.test(v) && Number(v) > 0,
//     error: "Please enter a valid number of guests.",
//   },
//   {
//     key: "budget",
//     question: "💰 What’s your total budget (in INR)?",
//     suggestions: ["100000", "200000", "300000"],
//     validator: (v) => /^\d+$/.test(v) && Number(v) >= 10000,
//     error: "Please enter a valid number (>= 10000).",
//   },
//   {
//     key: "date",
//     question: "📅 What’s the event date? (YYYY-MM-DD)",
//     validator: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v),
//     error: "Enter date as YYYY-MM-DD.",
//   },
//   {
//     key: "venue",
//     question: "📍 Preferred city/venue?",
//     suggestions: [
//       "Surat",
//       "Raipur",
//       "Ahmedabad",
//       "Mumbai",
//       "Jaipur",
//       "Delhi",
//       "Patna",
//       "Manali",
//       "Noida",
//     ],
//   },
//   {
//     key: "food",
//     question: "🍽️ Preferred food?",
//     suggestions: ["Veg", "Non-Veg", "Vegan", "Mixed"],
//   },
//   {
//     key: "theme",
//     question: "🎨 Pick a theme style",
//     suggestions: ["Royal", "Rustic", "Minimalist", "Modern"],
//   },
// ];

// export default function ChatPlanner() {
//   const [stepIdx, setStepIdx] = useState(0);
//   const [messages, setMessages] = useState([
//     { from: "bot", text: STEPS[0].question },
//   ]);
//   const [answers, setAnswers] = useState({});
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [plan, setPlan] = useState(null);
//   const listRef = useRef(null);

//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [messages, plan]);

//   const currentStep = STEPS[stepIdx];

//   const sendAnswer = async (value) => {
//     if (!currentStep) return;

//     if (currentStep.validator && !currentStep.validator(value)) {
//       setMessages((m) => [
//         ...m,
//         { from: "user", text: value },
//         { from: "bot", text: currentStep.error },
//       ]);
//       return;
//     }

//     const newAnswers = { ...answers, [currentStep.key]: value };
//     setAnswers(newAnswers);
//     setMessages((m) => [...m, { from: "user", text: value }]);

//     if (stepIdx < STEPS.length - 1) {
//       setStepIdx(stepIdx + 1);
//       setMessages((m) => [
//         ...m,
//         { from: "bot", text: STEPS[stepIdx + 1].question },
//       ]);
//     } else {
//       setLoading(true);
//       setMessages((m) => [
//         ...m,
//         { from: "bot", text: "⏳ Got it! Generating your plan..." },
//       ]);
//       try {
//         const payload = {
//           eventType: newAnswers.eventType,
//           guests: Number(newAnswers.guests),
//           budget: Number(newAnswers.budget),
//           date: newAnswers.date,
//           venue: newAnswers.venue,
//           food: newAnswers.food,
//           theme: newAnswers.theme,
//         };
//         const res = await axiosInstance.post(
//           API_PATHS.AI.GENERATE_PLAN,
//           payload
//         );
//         setPlan(res.data.plan);
//         setMessages((m) => [
//           ...m,
//           { from: "bot", text: "✨ Here’s your event plan!" },
//         ]);
//       } catch (err) {
//         let errorMsg = "Something went wrong. Please try again.";
//         toast.error(errorMsg, {
//           style: {
//             width: "280px",
//             borderRadius: "12px",
//             textAlign: "center",
//             margin: "0 auto",
//           },
//         });
//         if (err.response) {
//           if (err.response.status === 401) {
//             errorMsg = "Unauthorized. Please login first.";
//           } else if (err.response.status === 403) {
//             errorMsg = "Access denied. You don’t have permission.";
//           } else if (err.response.data?.message) {
//             errorMsg = err.response.data.message;
//           }
//         } else if (err.request) {
//           errorMsg = "No response from server. Check your connection.";
//         } else {
//           errorMsg = err.message;
//         }
//         setMessages((m) => [...m, { from: "bot", text: errorMsg }]);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const onEnter = (e) => {
//     if (e.key === "Enter" && input.trim() && !loading) {
//       sendAnswer(input.trim());
//       setInput("");
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-screen border border-gray-200 mt-2">
//       {/* Chat Window */}
//       <div ref={listRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
//         <AnimatePresence>
//           {messages.map((m, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`flex ${
//                 m.from === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[75%] shadow ${
//                   m.from === "user"
//                     ? "bg-indigo-600 text-white rounded-br-none"
//                     : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
//                 }`}
//               >
//                 {m.text}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Suggestion Chips */}
//         {!plan && currentStep?.suggestions?.length > 0 && (
//           <motion.div
//             className="flex flex-wrap gap-2 mt-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             {currentStep.suggestions.map((s) => (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 key={s}
//                 onClick={() => sendAnswer(s)}
//                 disabled={loading}
//                 className="px-4 py-1 text-sm rounded-full border border-gray-300 bg-white hover:bg-indigo-50 hover:border-indigo-400 transition shadow-sm"
//               >
//                 {s}
//               </motion.button>
//             ))}
//           </motion.div>
//         )}

//         {/* Plan Result */}
//         {plan && (
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mt-4"
//           >
//             <PlanResult plan={plan} />
//           </motion.div>
//         )}
//       </div>

//       {/* Input */}
//       {!plan && (
//         <div className="p-3 border-t bg-white flex gap-2">
//           <input
//             className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
//             placeholder="Type your answer…"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={onEnter}
//             disabled={loading}
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => {
//               if (input.trim() && !loading) {
//                 sendAnswer(input.trim());
//                 setInput("");
//               }
//             }}
//             disabled={loading}
//             className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
//           >
//             {loading ? "..." : "Send"}
//           </motion.button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import PlanResult from "./PlanResult";
import { toast } from "react-toastify";

const STEPS = [
  { key: "eventType", question: "🎉 What type of event is this?", suggestions: ["Wedding", "Birthday", "Corporate"] },
  { key: "guests", question: "👥 How many guests are you expecting?", suggestions: ["50", "100", "200"], validator: (v) => /^\d+$/.test(v) && Number(v) > 0, error: "Please enter a valid number of guests." },
  { key: "budget", question: "💰 What’s your total budget (in INR)?", suggestions: ["60000", "100000", "200000", "300000","600000"], validator: (v) => /^\d+$/.test(v) && Number(v) >= 59000, error: "Please enter a valid number (>= 59000)." },
  { key: "date", question: "📅 What’s the event date? (YYYY-MM-DD)", validator: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v), error: "Enter date as YYYY-MM-DD." },
  { key: "venue", question: "📍 Preferred city/venue?", suggestions: ["Surat", "Raipur", "Ahmedabad", "Mumbai", "Jaipur", "Delhi", "Patna", "Manali", "Noida"] },
  { key: "food", question: "🍽️ Preferred food?", suggestions: ["Veg", "Non-Veg", "Vegan", "Mixed"] },
  { key: "theme", question: "🎨 Pick a theme style", suggestions: ["Royal", "Rustic", "Minimalist", "Modern"] },
];

export default function ChatPlanner() {
  const [stepIdx, setStepIdx] = useState(0);
  const [messages, setMessages] = useState([{ from: "bot", text: STEPS[0].question }]);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [botTyping, setBotTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, plan, botTyping]);

  const currentStep = STEPS[stepIdx];

  const sendAnswer = async (value) => {
    if (!currentStep) return;
    if (currentStep.validator && !currentStep.validator(value)) {
      setMessages((m) => [...m, { from: "user", text: value }, { from: "bot", text: currentStep.error }]);
      return;
    }

    const newAnswers = { ...answers, [currentStep.key]: value };
    setAnswers(newAnswers);
    setMessages((m) => [...m, { from: "user", text: value }]);

    if (stepIdx < STEPS.length - 1) {
      setBotTyping(true);
      setTimeout(() => {
        setStepIdx(stepIdx + 1);
        setMessages((m) => [...m, { from: "bot", text: STEPS[stepIdx + 1].question }]);
        setBotTyping(false);
      }, 600);
    } else {
      setLoading(true);
      setBotTyping(true);
      setTimeout(async () => {
        setMessages((m) => [...m, { from: "bot", text: "⏳ Got it! Generating your plan..." }]);
        try {
          const payload = { ...newAnswers, guests: Number(newAnswers.guests), budget: Number(newAnswers.budget) };
          const res = await axiosInstance.post(API_PATHS.AI.GENERATE_PLAN, payload);
          setPlan(res.data.plan);
          console.log(res.data.plan)
          setMessages((m) => [...m, { from: "bot", text: "✨ Here’s your event plan!" }]);
        } catch (error) {
          let errorMsg = "Something went wrong. Please try again.";
          toast.error(errorMsg);
          setMessages((m) => [...m, { from: "bot", text: errorMsg }]);
        } finally {
          setLoading(false);
          setBotTyping(false);
        }
      }, 1200);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 animate-gradient ">
      <div className="w-full  max-w-2xl h-[90vh] bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl flex flex-col border border-white/40 overflow-hidden">
        {/* Chat Window */}
        <div ref={listRef} className="flex-1  p-4 space-y-3 overflow-y-auto">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-md ${
                    m.from === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none"
                      : "bg-white/70 text-gray-900 border border-gray-200 rounded-bl-none"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {m.text}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {botTyping && (
            <div className="flex justify-start pl-2">
              <motion.div className="bg-white/80 px-4 py-2 rounded-2xl shadow flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Suggestion Chips */}
          {!plan && currentStep?.suggestions?.length > 0 && (
            <motion.div className="flex flex-wrap gap-2 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {currentStep.suggestions.map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendAnswer(s)}
                  disabled={loading}
                  className="px-4 py-2 text-sm rounded-full border border-indigo-200 bg-white/80 hover:bg-indigo-100 shadow-sm transition"
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Plan Result */}
          {plan && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-4">
              <PlanResult plan={plan} />
            </motion.div>
          )}
        </div>

        {/* Input Bar */}
        {!plan && (
          <div className="p-3 border-t bg-white/80 backdrop-blur-md flex gap-2 shadow-lg">
            <input
              className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300 bg-white/90 transition-all"
              placeholder="Type your answer…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input.trim() && sendAnswer(input.trim())}
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => input.trim() && sendAnswer(input.trim())}
              disabled={loading}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow hover:shadow-xl transition"
            >
              {loading ? "..." : "Send"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

