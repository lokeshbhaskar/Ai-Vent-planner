import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export default function PlanResult({ plan }) {
  const { user } = useContext(UserContext);

  const sectionVariants = {
    hidden: { opacity: 0, y: 25 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  // Save event details
  const handlesave = async () => {
    if (!user || !plan) return;
    console.log(plan);
    try {
      const payload = {
        user: user._id,
        eventType: plan.title,
        guestsBudget: {
          guests: plan.guests || 0, // fallback to 0 if not present
          budget: plan.budget?.total || 0, // ✅ save total budget
        },
        dateVenue: {
          date: plan.date,
          venue: plan.venue,
        },
        foodTheme: {
          food: plan.food?.join(", ") || "",
          theme: plan.theme?.name || "",
        },
      };

      console.log("🟢 Payload being sent =>", payload);

      const res = await axiosInstance.post(
        API_PATHS.EVENT.SAVE_EVENT_DETAILS,
        payload
      );

      if (res.data.success) {
        toast.success("📌 Event saved successfully!", {
          style: {
            width: "280px",
            borderRadius: "12px",
            textAlign: "center",
            margin: "0 auto",
          },
        });
      } else {
        toast.error("❌ Failed to save event. Please try again.", {
          style: {
            width: "280px",
            borderRadius: "12px",
            textAlign: "center",
            margin: "0 auto",
          },
        });
      }
    } catch (error) {
      console.error("❌ Error saving event:", error);
      alert("Something went wrong while saving the event.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center">
      <div className="w-full max-w-2xl space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-indigo-700">{plan.title}</h3>
          <p className="text-gray-600 mt-1">
            📅 {plan.date} | 📍 {plan.venue}
          </p>
        </motion.div>

        {[
          {
            label: "🎨 Theme",
            data: plan.theme?.decor?.concat(plan.theme?.lighting || []),
            bg: "bg-purple-50",
          },
          { label: "🍽️ Food", data: plan.food, bg: "bg-yellow-50" },
          {
            label: "🎶 Entertainment",
            data: plan.entertainment,
            bg: "bg-blue-50",
          },
          { label: "✨ Extras", data: plan.extras, bg: "bg-pink-50" },
        ].map((section, i) => (
          <motion.section
            key={i}
            custom={i}
            initial="hidden"
            animate="show"
            variants={sectionVariants}
            className={`${section.bg} p-4 rounded-xl shadow`}
          >
            <h4 className="font-semibold mb-2">{section.label}</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {section.data?.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* Budget */}
        <motion.section
          custom={5}
          initial="hidden"
          animate="show"
          variants={sectionVariants}
          className="bg-green-50 p-4 rounded-xl shadow"
        >
          <h4 className="font-semibold mb-2">💰 Budget</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {Object.entries(plan.budget || {}).map(([k, v]) => (
              <li key={k} className="capitalize">
                {k}: <b>{v}</b>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Save button */}
        <motion.button
          onClick={handlesave}
          className="flex items-center justify-center gap-2 w-full px-4 py-2  hover:bg-gray-100 transition text-teal-700 cursor-pointer "
          whileHover={{ scale: 1.05 }}
        >
          <Save className="text-purple-500" /> Save
        </motion.button>
      </div>
    </div>
  );
}
