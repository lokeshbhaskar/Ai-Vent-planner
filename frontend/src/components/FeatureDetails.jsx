import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  IndianRupee,
  Calendar,
  Users,
  Star,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

const featureGroups = [
  {
    icon: Brain,
    color: "text-indigo-600 bg-indigo-50",
    title: "AI Event Planning",
    description:
      "Describe your event and let AI instantly generate a complete, personalized plan with venue suggestions, budget allocation, vendor recommendations, and more.",
    benefits: [
      "Instant plan generation",
      "Smart venue matching",
      "Budget optimization",
      "Personalized recommendations",
    ],
  },
  {
    icon: IndianRupee,
    color: "text-emerald-600 bg-emerald-50",
    title: "Smart Budget Planning",
    description:
      "AI intelligently allocates your budget across venue, catering, decor, entertainment, and photography based on event type and guest count.",
    benefits: [
      "Automatic budget split",
      "Cost per guest calculation",
      "Vendor cost comparison",
      "Real-time budget updates",
    ],
  },
  {
    icon: Calendar,
    color: "text-blue-600 bg-blue-50",
    title: "Event Timeline",
    description:
      "Auto-generated countdown timelines with milestone tasks, reminders, and deadlines — ensuring nothing falls through the cracks.",
    benefits: [
      "30/21/14/7-day countdowns",
      "Task checklists",
      "Deadline tracking",
      "Day-of schedule",
    ],
  },
  {
    icon: Users,
    color: "text-violet-600 bg-violet-50",
    title: "Guest Management",
    description:
      "Track RSVPs, meal preferences, dietary restrictions, and contact details. Export lists and send personalized invitations.",
    benefits: [
      "RSVP tracking",
      "Meal preference capture",
      "Guest list export",
      "Invitation management",
    ],
  },
  {
    icon: Star,
    color: "text-amber-600 bg-amber-50",
    title: "Vendor Recommendations",
    description:
      "Get curated recommendations for venues, photographers, caterers, decorators, and entertainment based on your city and budget.",
    benefits: [
      "City-based matching",
      "Budget-filtered vendors",
      "Contact information",
      "Service type categorization",
    ],
  },
  {
    icon: Sparkles,
    color: "text-pink-600 bg-pink-50",
    title: "AI Event Assistant",
    description:
      "Chat with your AI assistant to adjust plans, get suggestions, and ask questions about your event at any time.",
    benefits: [
      "Natural language queries",
      "Plan adjustments",
      "Budget suggestions",
      "Contextual advice",
    ],
  },
];

export default function FeatureDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-zinc-50 border-b border-zinc-200 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Features</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mt-3 mb-4">
              Everything you need to plan
              <br />
              <span className="gradient-text">a perfect event</span>
            </h1>
            <p className="text-zinc-500 text-lg mb-8">
              From AI-powered planning to vendor management, AIvent covers every
              detail of your event.
            </p>
            <button
              onClick={() => navigate("/ai-planner-page")}
              className="btn-primary px-6 py-3 text-base gap-2"
            >
              Start Planning Free
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Feature list */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        {featureGroups.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              className="avy-card p-8 flex flex-col md:flex-row gap-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="shrink-0">
                <div
                  className={`w-14 h-14 rounded-2xl ${feat.color} flex items-center justify-center`}
                >
                  <Icon size={26} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-zinc-900 mb-2">
                  {feat.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                  {feat.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {feat.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-indigo-600" />
                      </div>
                      <span className="text-xs text-zinc-600">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="bg-zinc-50 border-t border-zinc-200 py-16">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            Ready to experience all these features?
          </h2>
          <p className="text-zinc-500 mb-8">
            Create your first event plan for free. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/sign-up-page")}
              className="btn-primary px-8 py-3 text-base"
            >
              Get started free
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn-secondary px-8 py-3 text-base"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
